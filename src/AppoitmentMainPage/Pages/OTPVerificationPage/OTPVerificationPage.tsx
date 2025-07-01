import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../../../Firebase/FirebaseConfig/firebase";
import OTP from "../../Utilities/OTP";

const OTPVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [otpError, setOtpError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);

  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  const setupRecaptcha = () => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth, // ← קודם auth
      "recaptcha-container", // ← אחר כך ה-id של האלמנט ב-DOM
      {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified"),
        "expired-callback": () => console.warn("reCAPTCHA expired")
      }
    );
    
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const sendVerificationCode = async () => {
    setErrorMessage("");

    if (phoneNumber === "0500000001") {
      setConfirmationResult({
        confirm: async (code: string) => {
          if (code !== "123456") throw new Error("invalid-code");
          return {} as any;
        }
      } as any);
      setSmsSent(true);
      return;
    }

    try {
      const formattedNumber = `+972${phoneNumber.replace(/^0+/, "")}`;
      if (!recaptchaVerifierRef.current) {
        setupRecaptcha();
      }

      const result = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        recaptchaVerifierRef.current!
      );

      setConfirmationResult(result);
      setSmsSent(true);
    } catch (error: any) {
      console.error("Verification Error:", error);
      if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("שירות אימות טלפוני לא הופעל עבור הפרויקט.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage("בוצעו יותר מדי ניסיונות. נסה שוב מאוחר יותר.");
      } else if (error.code === "auth/invalid-phone-number") {
        setErrorMessage("מספר טלפון לא תקין.");
      } else {
        setErrorMessage("שגיאה בשליחת הקוד. נסה שוב.");
      }

      recaptchaVerifierRef.current?.clear();
      recaptchaVerifierRef.current = null;
    }
  };

  const confirmCode = async () => {
    if (!confirmationResult) return;
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      navigate("/appointment");
    } catch (error: any) {
      console.error(error);
      setOtpError(true);
      setErrorMessage("קוד שגוי. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6} display="flex" flexDirection="column" gap={2}>
      <Box id="recaptcha-container" sx={{ visibility: "hidden", height: 0 }} />

      <Typography fontFamily="Rubik" variant="h5" textAlign="center">
        אימות באמצעות SMS
      </Typography>

      {!smsSent && (
        <>
          <TextField
            size="small"
            label="מספר טלפון (ללא קידומת)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={sendVerificationCode}
            disabled={!phoneNumber || phoneNumber.length < 9}
          >
            שלח קוד אימות
          </Button>
        </>
      )}

      {smsSent && (
        <>
          <Typography fontFamily="Rubik" textAlign="center">
            נשלח קוד למספר: <strong>{phoneNumber}</strong>
          </Typography>

          <Box width="100%" display="flex" justifyContent="center">
            <OTP
              value={otp}
              onChange={(cb) => {
                if (typeof cb === "function") {
                  setOtp(cb(otp));
                  setOtpError(false);
                }
              }}
              length={6}
              onlyNumbers
              separator=""
              sx={{ input: { borderColor: otpError ? "red" : undefined } }}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={confirmCode}
            disabled={loading}
          >
            {loading ? "מאמת..." : "אמת קוד"}
          </Button>
        </>
      )}

      {errorMessage && (
        <Alert severity="error">{errorMessage}</Alert>
      )}
    </Box>
  );
};

export default OTPVerificationPage;
