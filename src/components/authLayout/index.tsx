import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import Sidebar from '../sidebar';
import Navbar from '../navbar';

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedOut>
      <div className="flex w-full h-screen items-center justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </SignedOut>
    <SignedIn>
      <div className="h-full relative">
        <div className="hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <Sidebar />
        </div>
        <div className="relative w-full md:pl-72">
          <Navbar />
          {children}
        </div>
      </div>
    </SignedIn>
  </>
);

export default AuthLayout;
