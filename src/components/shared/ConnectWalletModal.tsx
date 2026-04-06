"use client";
import { useEffect } from "react";

export default function ConnectWalletModal({
  isOpen = false,
  onClose = () => {},
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="connect-wallet-section position-fixed top-0 start-0 w-100 vh-100" style={{ zIndex: 10000 }}>
            <div className="connect-wallet-overlay position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }} onClick={onClose}></div>
            <div className="vh-100 wallet-wrapper d-center position-relative" style={{ zIndex: 10001, pointerEvents: 'none' }}>
                <div className="wallet-area pt-lg-8 pt-sm-6 pt-4 pb-lg-20 pb-sm-10 pb-6 px-lg-15 px-sm-8 px-3 bgn-4 rounded-5" style={{ pointerEvents: 'auto' }}>
                    <div className="mb-lg-7 mb-sm-5 mb-3 d-flex justify-content-end">
                        <i className="ti ti-circle-x display-four fw-normal pointer wallet-close-btn" onClick={onClose}></i>
                    </div>
                    <h3 className="tcn-1 cursor-scale growDown title-anim mb-lg-20 mb-sm-10 mb-6">
                        Connect Your Wallet
                    </h3>
                    <div className="wallet-option pb-20">
                        <ul className="d-grid gap-sm-8 gap-4">
                            <li className="wallet-item p-sm-6 p-2 bgn-4 rounded-4">
                                <a href="#" className="d-between">
                                    <span>Connect with Metamask</span>
                                    <div className="wallet-item-thumb">
                                        <img className="w-100" src="/assets/img/metamask.webp" alt="metamask" />
                                    </div>
                                </a>
                            </li>
                            <li className="wallet-item p-sm-6 p-2 bgn-4 rounded-4">
                                <a href="#" className="d-between">
                                    <span>Connect with Wallet Connect </span>
                                    <div className="wallet-item-thumb">
                                        <img className="w-100" src="/assets/img/walletconnect.webp" alt="wallet connect" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
