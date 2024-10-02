import React, { useState } from "react";
import toast from "react-hot-toast";

export default function GetHelp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      try {
        const response = await fetch("http://localhost:5000/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("OTP sent to your email");
          setStep(2);
        } else {
          toast(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (step === 2) {
      try {
        const response = await fetch("http://localhost:5000/api/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, newPassword }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Password reset successfully");
          setStep(1);
          setEmail("");
          setOtp("");
          setNewPassword("");
        } else {
          toast(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-card rounded-lg shadow-lg p-8 m-5 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-primary-foreground">
          {step === 1 ? "Get Help" : "Reset Password"}
        </h2>
        <p className="text-muted-foreground mb-4">
          {step === 1
            ? "Please enter your registered email, and we will send you an OTP to reset your password."
            : "Please enter the OTP sent to your email and your new password."}
        </p>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="mb-4">
              <label
                className="block text-sm text-muted-foreground"
                htmlFor="email"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email ID *"
                className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm text-muted-foreground"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm text-muted-foreground"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter New Password *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-primary-foreground text-secondary hover:bg-primary/80 w-full font-medium p-2 rounded-full"
          >
            {step === 1 ? "Send OTP" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
