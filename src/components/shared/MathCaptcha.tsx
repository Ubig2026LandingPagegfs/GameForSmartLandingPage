"use client";

import { useState, useEffect, useCallback } from "react";

interface MathCaptchaProps {
  onVerify: (verified: boolean) => void;
  className?: string;
  resetKey?: number;
}

function generateQuestion() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  if (op === "+") {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    answer = a + b;
  } else if (op === "-") {
    a = Math.floor(Math.random() * 20) + 10;
    b = Math.floor(Math.random() * 10) + 1;
    answer = a - b;
  } else {
    a = Math.floor(Math.random() * 9) + 2;
    b = Math.floor(Math.random() * 9) + 2;
    answer = a * b;
  }

  return { question: `${a} ${op} ${b}`, answer };
}

export default function MathCaptcha({ onVerify, className = "", resetKey = 0 }: MathCaptchaProps) {
  const [mounted, setMounted] = useState(false);
  const [qData, setQData] = useState<ReturnType<typeof generateQuestion> | null>(null);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    setQData(generateQuestion());
    setMounted(true);
  }, []);

  const refresh = useCallback(() => {
    setQData(generateQuestion());
    setInput("");
    setStatus("idle");
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    if (resetKey > 0) {
      refresh();
    }
  }, [resetKey, refresh]);

  const check = (val: string) => {
    if (!qData) return;
    setInput(val);
    if (val.trim() === "") {
      setStatus("idle");
      onVerify(false);
      return;
    }
    const correct = parseInt(val, 10) === qData.answer;
    setStatus(correct ? "ok" : "err");
    onVerify(correct);
  };

  const borderColor =
    status === "ok" ? "rgba(74,222,128,0.6)" :
    status === "err" ? "rgba(248,113,113,0.5)" :
    "rgba(255,255,255,0.1)";

  const glowColor =
    status === "ok" ? "0 0 0 3px rgba(74,222,128,0.15)" :
    status === "err" ? "0 0 0 3px rgba(248,113,113,0.1)" :
    "none";

  if (!mounted) {
    return (
      <div className={`math-captcha ${className}`}>
        <div className="captcha-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Verifikasi Keamanan
        </div>
        <div className="captcha-body captcha-skeleton">
          <div className="captcha-question">
            <span className="eq-text">Memuat soal...</span>
          </div>
        </div>
        <style jsx>{`
          .math-captcha { width: 100%; }
          .captcha-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 10px; }
          .captcha-body { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 18px; }
          .captcha-question { display: flex; align-items: center; }
          .eq-text { font-size: 13px; color: rgba(255,255,255,0.2); font-weight: 300; }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`math-captcha ${className}`}>
      <div className="captcha-label">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        Verifikasi Keamanan
      </div>

      <div className="captcha-body">
        <div className="captcha-question">
          <span className="eq-text">Berapa hasil dari&nbsp;</span>
          <span className="eq-value">{qData?.question} = ?</span>
        </div>

        <div className="captcha-input-row">
          <div className="captcha-input-wrap" style={{ borderColor, boxShadow: glowColor }}>
            <input
              type="number"
              inputMode="numeric"
              value={input}
              onChange={e => check(e.target.value)}
              placeholder="Jawaban"
              autoComplete="off"
              className="captcha-input"
            />
            {status === "ok" && (
              <span className="captcha-icon ok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
            )}
            {status === "err" && (
              <span className="captcha-icon err">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </span>
            )}
          </div>

          <button type="button" onClick={refresh} className="captcha-refresh" title="Ganti soal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>

        {status === "err" && (
          <p className="captcha-hint">Jawaban salah, coba lagi.</p>
        )}
        {status === "ok" && (
          <p className="captcha-hint ok">Verifikasi berhasil!</p>
        )}
      </div>

      <style jsx>{`
        .math-captcha {
          width: 100%;
        }

        .captcha-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 10px;
        }

        .captcha-body {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 16px 18px;
        }

        .captcha-question {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 12px;
        }

        .eq-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }

        .eq-value {
          font-family: 'Chakra Petch', monospace;
          font-size: 18px;
          font-weight: 700;
          color: #ea580c;
          letter-spacing: 1px;
        }

        .captcha-input-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .captcha-input-wrap {
          flex: 1;
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid;
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        .captcha-input {
          width: 100%;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 10px 40px 10px 14px;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          -moz-appearance: textfield;
        }

        .captcha-input::-webkit-outer-spin-button,
        .captcha-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .captcha-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
          font-weight: 300;
        }

        .captcha-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
        }

        .captcha-icon.ok { color: #4ade80; }
        .captcha-icon.err { color: #f87171; }

        .captcha-refresh {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .captcha-refresh:hover {
          background: rgba(234, 88, 12, 0.15);
          border-color: rgba(234, 88, 12, 0.3);
          color: #ea580c;
          transform: rotate(90deg);
        }

        .captcha-hint {
          margin: 8px 0 0;
          font-size: 12px;
          color: #f87171;
          font-weight: 400;
        }

        .captcha-hint.ok {
          color: #4ade80;
        }
      `}</style>
    </div>
  );
}
