import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Member, Verification } from "@shared/schema";

export default function Verify() {
  const [location, navigate] = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [member, setMember] = useState<Member | null>(null);
  const [verification, setVerification] = useState<Verification | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setVerificationStatus('error');
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setMember(data.member);
        setVerification(data.verification);
        setVerificationStatus('success');
        toast({
          title: "Welcome to Alchemy United!",
          description: "Your email has been verified and your membership is now active.",
        });
      } else {
        const error = await response.json();
        if (error.error?.includes('expired')) {
          setVerificationStatus('expired');
        } else {
          setVerificationStatus('error');
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const StatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />;
      case 'loading':
        return <Clock className="w-16 h-16 text-gold animate-pulse mx-auto" />;
      case 'expired':
      case 'error':
        return <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />;
      default:
        return <Mail className="w-16 h-16 text-gray-400 mx-auto" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'loading':
        return {
          title: "Verifying your email...",
          description: "Please wait while we process your verification."
        };
      case 'success':
        return {
          title: "Welcome to Alchemy United!",
          description: "Your email has been verified successfully. You now have exclusive access to our premium EV charging network."
        };
      case 'expired':
        return {
          title: "Verification Link Expired",
          description: "This verification link has expired. Please contact our support team for a new verification link."
        };
      case 'error':
        return {
          title: "Verification Failed",
          description: "We couldn't verify your email address. Please check the link or contact our support team."
        };
      default:
        return {
          title: "Invalid Link",
          description: "This verification link appears to be invalid."
        };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <img 
            src="/assets/au-logo.png" 
            alt="Alchemy United"
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white font-display mb-2">
            Alchemy United
          </h1>
          <p className="text-gray-400 text-lg">
            Premium EV Charging Network
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader className="text-center pb-4">
              <StatusIcon />
              <CardTitle className="text-2xl text-white mt-4">
                {statusMessage.title}
              </CardTitle>
              <CardDescription className="text-gray-300 text-base mt-2">
                {statusMessage.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {verificationStatus === 'success' && member && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gold mb-4">
                      Your Membership Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Member Name</p>
                        <p className="text-white font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Membership Number</p>
                        <p className="text-gold font-mono font-medium">
                          {member.membershipNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p className="text-white">{member.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Vehicle</p>
                        <p className="text-white">{member.vehicleType}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gold/20">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          Active Member
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      What's Next?
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        Access to premium charging stations across the network
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        Priority booking and concierge services
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        Exclusive member events and networking opportunities
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        24/7 premium support and assistance
                      </li>
                    </ul>
                  </div>

                  {verification?.invitationCode && (
                    <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Your Invitation Code
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        Share this exclusive code with friends and family:
                      </p>
                      <div className="bg-black/20 rounded border border-gold/30 p-3">
                        <p className="text-gold font-mono text-lg text-center font-bold">
                          {verification.invitationCode}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                
                {verificationStatus === 'success' && (
                  <Button 
                    className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold"
                    onClick={() => window.open('mailto:support@alchemyunited.com', '_blank')}
                  >
                    Contact Support
                  </Button>
                )}
                
                {(verificationStatus === 'error' || verificationStatus === 'expired') && (
                  <Button 
                    className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold"
                    onClick={() => window.open('mailto:support@alchemyunited.com', '_blank')}
                  >
                    Get Help
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}