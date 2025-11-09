import React, { useState, useEffect, useRef } from 'react';
import { Mail, Clock, RefreshCw, X, Shield } from 'lucide-react';

export default function OTPModal({ 
    isOpen, 
    onClose, 
    userData, 
    onOTPVerified 
}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpId, setOtpId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [rateLimitTime, setRateLimitTime] = useState(0); // For resend rate limiting
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    
    const inputRefs = useRef([]);
    const timerRef = useRef(null);
    const rateLimitTimerRef = useRef(null);

    // Request OTP when modal opens
    useEffect(() => {
        if (isOpen && userData) {
            // Reset all states when