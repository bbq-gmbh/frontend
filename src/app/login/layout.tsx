import LoginLayout from "@/components/login-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoginLayout>{children}</LoginLayout>;
}
