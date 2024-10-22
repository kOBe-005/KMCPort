import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KMCPortal",
  description: " ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <main className="min-h-screen">{children}</main>
            <footer className="bg-gray-950 py-8">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p>Gold Buster</p>
              </div>
            </footer>
            <CreateEventDrawer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
