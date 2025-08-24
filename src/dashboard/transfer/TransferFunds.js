import React, { useEffect, useState, useCallback } from "react";
import { Descope, useSession } from "@descope/react-sdk";
import { Button, Input, Typography, theme } from "antd";
import "./transferFunds.scss";

const PENDING_TRANSFER_KEY = "pendingTransfer";

const TransferFunds = () => {
  const { sessionToken } = useSession();
  const { useToken } = theme;
  const { token } = useToken();
  const [steppedUp, setSteppedUp] = useState(false);
  const [amount, setAmount] = useState("");
  const [showStepUp, setShowStepUp] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [error, setError] = useState("");

  // Helper to check if session is stepped up
  const checkStepUp = useCallback(() => {
    if (sessionToken) {
      try {
        const payload = JSON.parse(atob(sessionToken.split('.')[1]));
        if (payload.su) {
          setSteppedUp(true);
        } else {
          setSteppedUp(false);
        }
      } catch (e) {
        setSteppedUp(false);
      }
    } else {
      setSteppedUp(false);
    }
  }, [sessionToken]);

  // On mount, check for pending transfer in localStorage
  useEffect(() => {
    checkStepUp();
    const pending = localStorage.getItem(PENDING_TRANSFER_KEY);
    if (pending) {
      try {
        const { amount: pendingAmount, needsStepUp } = JSON.parse(pending);
        setAmount(pendingAmount || "");
        if (steppedUp && needsStepUp) {
          // Complete the transfer if user is now stepped up
          setTransferSuccess(true);
          setShowStepUp(false);
          setError("");
          localStorage.removeItem(PENDING_TRANSFER_KEY);
        } else if (needsStepUp) {
          setShowStepUp(true);
        }
      } catch (e) {
        localStorage.removeItem(PENDING_TRANSFER_KEY);
      }
    }
  }, [checkStepUp, steppedUp]);

  useEffect(() => {
    if (sessionToken) {
      try {
        const payload = JSON.parse(atob(sessionToken.split('.')[1]));
        console.log("[MOUNT/RELOAD] sessionToken payload:", payload);
      } catch (e) {
        console.log("[MOUNT/RELOAD] sessionToken exists but could not decode payload.");
      }
    } else {
      console.log("[MOUNT/RELOAD] No sessionToken available");
    }
  }, [sessionToken]);

  // Handler for Descope step-up success (works for magic link and others)
  const handleStepUpSuccess = () => {
    setTimeout(() => {
      checkStepUp();
      setShowStepUp(false);
      // After step-up, try to transfer again
      const pending = localStorage.getItem(PENDING_TRANSFER_KEY);
      if (pending) {
        try {
          const { amount: pendingAmount } = JSON.parse(pending);
          setAmount(pendingAmount || "");
          setTransferSuccess(true);
          localStorage.removeItem(PENDING_TRANSFER_KEY);
        } catch (e) {
          localStorage.removeItem(PENDING_TRANSFER_KEY);
        }
      }
    }, 1000);
  };

  const handleTransfer = (e) => {
    if (e) e.preventDefault();
    setError("");
    setTransferSuccess(false);
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (amt > 100 && !steppedUp) {
      // Save pending transfer to localStorage
      localStorage.setItem(PENDING_TRANSFER_KEY, JSON.stringify({ amount, needsStepUp: true }));
      setShowStepUp(true);
      return;
    }
    // Simulate transfer
    setTransferSuccess(true);
    setAmount("");
    localStorage.removeItem(PENDING_TRANSFER_KEY);
  };

  const handleCancelStepUp = () => {
    setShowStepUp(false);
    localStorage.removeItem(PENDING_TRANSFER_KEY);
  };

  if (showStepUp && !steppedUp) {
    return (
      <div
        className="transfer-funds-container"
        style={{
          background: token.colorBgContainer,
          color: token.colorTextBase,
          borderRadius: 16,
          boxShadow: token.boxShadow || "0 2px 16px rgba(0,0,0,0.07)",
          maxWidth: 420,
          margin: "48px auto",
          textAlign: "center",
        }}
      >
        <Typography.Title level={2} className="transfer-funds-title" style={{ color: token.colorTextBase }}>
          Step-Up Authentication Required
        </Typography.Title>
        <div className="transfer-funds-stepup">
          <Descope
            flowId="step-up"
            onSuccess={handleStepUpSuccess}
            onError={() => alert("Step-up failed!")}
          />
          <Button onClick={handleCancelStepUp} style={{ marginTop: 16 }}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="transfer-funds-container"
      style={{
        background: token.colorBgContainer,
        color: token.colorTextBase,
        borderRadius: 16,
        boxShadow: token.boxShadow || "0 2px 16px rgba(0,0,0,0.07)",
        maxWidth: 420,
        margin: "48px auto",
        textAlign: "center",
      }}
    >
      <Typography.Title level={2} className="transfer-funds-title" style={{ color: token.colorTextBase }}>
        Transfer Funds
      </Typography.Title>
      <form className="transfer-funds-form" onSubmit={handleTransfer}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <label htmlFor="amount" style={{ color: token.colorTextBase, marginBottom: 0, minWidth: 90 }}>Amount ($): </label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ width: 140, flex: 1 }}
          />
          <Button type="primary" htmlType="submit" style={{ minWidth: 120 }}>
            Transfer funds
          </Button>
        </div>
      </form>
      <div style={{ marginTop: 20, minHeight: 32 }}>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        {transferSuccess && (
          <Typography.Text style={{ color: "#38a169", fontWeight: 600, marginTop: 16, display: "block" }}>
            Funds successfully transferred!
          </Typography.Text>
        )}
      </div>
    </div>
  );
};

export default TransferFunds; 