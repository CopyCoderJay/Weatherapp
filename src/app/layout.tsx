import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata = {
  title: 'Weather App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
