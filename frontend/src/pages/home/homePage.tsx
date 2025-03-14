import { Button, Card, Input } from "@/components";
import { Mail, PlayCircle, Slack, Trello } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const router = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Trello className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">Trello</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">Plans</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Resources</Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router("login")} variant="ghost">
                Log in
              </Button>
              <Button
                onClick={() => router("register")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Trello for free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Announcement Banner */}
      <div className="bg-blue-50 py-3 px-4 text-center">
        <p className="text-sm text-blue-900">
          Accelerate your teams' work with Atlassian Intelligence (AI) features
          🤖 now available for all Premium and Enterprise!{" "}
          <a href="#" className="underline">
            Learn more
          </a>
        </p>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-6">
              Capture, organize, and tackle your to-dos from anywhere.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Escape the clutter and chaos—unleash your productivity with
              Trello.
            </p>
            <div className="space-y-4 max-w-md">
              <div className="flex space-x-2">
                <Input type="email" placeholder="Email" className="flex-1" />
                <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                  Sign up - it's free!
                </Button>
              </div>
              <Button
                variant="link"
                className="text-blue-600 flex items-center"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch video
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&h=800&q=80"
                alt="Trello mobile app"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute top-10 right-0 transform translate-x-1/4">
              <Card className="p-3 bg-white shadow-lg rounded-xl">
                <div className="flex items-center space-x-3">
                  <Mail className="h-8 w-8 text-red-500" />
                  <Slack className="h-8 w-8 text-purple-500" />
                </div>
              </Card>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-purple-600 w-32 h-32 rounded-full opacity-20" />
            <div className="absolute -top-10 -right-10 bg-orange-400 w-40 h-40 rounded-full opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
