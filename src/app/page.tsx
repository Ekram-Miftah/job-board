import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen  bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center  justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Find Your Next
            <span className="text-blue-600">Opportunity</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl">
            Connect with top employers and find the job that matches your skills
            and ambitions
          </p>
          <div className="flex gap-4">
            <Link href={"/jobs"}>
              <Button size="lg">Browse Jobs</Button>
            </Link>

            <Link href={"/register"}>
              <Button size="lg" variant={"outline"}>
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
