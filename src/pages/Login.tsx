import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { login, LoginCredentials, LoginResponse } from "@/services/authService";
import loginHero from "@/assets/login-hero.jpg";
import logo from "@/assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(cardRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
      .fromTo(formRef.current?.querySelectorAll('.form-field'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credentials: LoginCredentials = { email, password };
      const response: LoginResponse = await login(credentials);

      if (!response.success) {
        toast({
          title: "Login Failed",
          description: response.message || "Invalid credentials provided.",
          variant: "destructive",
        });
      } else {
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Side - Image & Testimonial */}
        <div className="hidden lg:block w-1/2 relative p-5">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: `url(${loginHero})` }}
          />
          <div className="absolute bottom-16 left-16 right-16 text-white">
            <h2 className="text-3xl font-semibold font-playfair mb-4 drop-shadow-lg">
              Create Unforgettable Events
            </h2>
            <blockquote className="space-y-4">
              <p className="text-base opacity-90 drop-shadow max-w-md leading-relaxed italic">
                "Simply all the tools that my team and I need to create unforgettable events."
              </p>
              <footer>
                <div className="font-semibold">Jimish R Shah</div>
                <div className="text-gold text-sm">Director of Namah Events</div>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-12">
          {/* Logo */}
          <div ref={headerRef} className="mb-10 text-left">
            <Link to="/" className="flex items-center space-x-3 hover-scale">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-xl font-semibold text-navy">Namah <span className="text-gold">Events</span></span>
            </Link>
          </div>

          {/* Login Card */}
          <Card ref={cardRef} className="border-0 shadow-none bg-transparent">
            <CardHeader className="space-y-2 text-center px-0 pt-0 pb-6">
              <h1 className="text-3xl font-bold font-playfair text-navy">Welcome Back</h1>
              <p className="text-muted-foreground text-base">Sign in to manage your events</p>
            </CardHeader>

            <CardContent className="px-0">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
                <div className="form-field space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-navy">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex.jordan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl text-base px-4 border-border focus:border-gold focus:ring-gold/20"
                    required
                  />
                </div>

                <div className="form-field space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-navy">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-xl text-base px-4 pr-12 border-border focus:border-gold focus:ring-gold/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                <div className="form-field pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-xl text-base font-medium bg-navy hover:bg-navy/90 text-white transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : ("Log In")}
                  </Button>
                </div>
              </form>

              {/* Footer Link */}
              <div className="mt-10 text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-navy inline-flex items-center space-x-2 font-medium">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Homepage</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;