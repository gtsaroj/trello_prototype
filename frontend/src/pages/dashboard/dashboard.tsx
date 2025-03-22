import { Button, Card, Input } from "@/components";
import { useAppSelector } from "@/hooks";
import { authLogout } from "@/reducers";
import { store } from "@/store";
import Cookies from "js-cookie";
import {
  Trello,
  Search,
  HelpCircle,
  Bell,
  Settings,
  ChevronDown,
  Plus,
  LayoutGrid,
  Clock,
  Star,
  Home,
  Users,
  Eye,
  CreditCard,
  Section as Collection,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAppSelector();
  return (
    <div className="min-h-screen bg-[#1D2125] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#1D2125] border-b border-[#333B44] px-4 h-[44px] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Trello className="h-5 w-5 text-[#579DFF]" />
            <span className="font-semibold">Trello</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              Workspaces <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              Recent <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              Starred <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              Templates <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button className="bg-[#579DFF] hover:bg-[#4C8FE9] h-8">
              Create
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9FADBC]" />
            <Input
              placeholder="Search"
              className="pl-8 bg-[#22272B] border-[#333B44] w-64 h-8 focus:ring-[#579DFF]"
            />
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => {
              store.dispatch(authLogout());
              Cookies?.remove("accessToken");
              Cookies?.remove("refreshToken");
            }}
            variant="ghost"
            size="icon"
            className="hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[240px] bg-[#1D2125] p-4 border-r border-[#333B44]">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-[#333B44]"
            >
              <LayoutGrid className="mr-2 h-4 w-4" /> Boards
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-[#333B44]"
            >
              <Clock className="mr-2 h-4 w-4" /> Recent
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-[#333B44]"
            >
              <Star className="mr-2 h-4 w-4" /> Starred
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-[#333B44]"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#9FADBC]">
                Workspaces
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-[#333B44]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <LayoutGrid className="mr-2 h-4 w-4" /> Boards
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <Users className="mr-2 h-4 w-4" /> Members
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <Eye className="mr-2 h-4 w-4" /> Views
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <Collection className="mr-2 h-4 w-4" /> Collections
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#333B44]"
              >
                <CreditCard className="mr-2 h-4 w-4" /> Billing
              </Button>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Templates</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card
              onClick={() => navigate(`/workspace/${user?.data?.uid} `)}
              className="bg-[#22272B] hover:ring ring-gray-600 cursor-pointer border-[#333B44] overflow-hidden"
            >
              <div className="h-32 bg-blue-600"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Basic Board</h3>
                <p className="text-sm text-[#9FADBC]">Template</p>
              </div>
            </Card>

            <Card className="bg-[#22272B] hover:ring ring-gray-600 cursor-pointer  border-[#333B44] overflow-hidden">
              <div className="h-32 bg-teal-600"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Kanban Template</h3>
                <p className="text-sm text-[#9FADBC]">Template</p>
              </div>
            </Card>

            <Card className="bg-[#22272B] hover:ring ring-gray-600 cursor-pointer border-[#333B44] overflow-hidden">
              <div className="h-32 bg-purple-600"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Daily Task Management</h3>
                <p className="text-sm text-[#9FADBC]">Template</p>
              </div>
            </Card>

            <Card className="bg-[#22272B] hover:ring ring-gray-600 cursor-pointer  border-[#333B44] overflow-hidden">
              <div className="h-32 bg-orange-600"></div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Remote Team Hub</h3>
                <p className="text-sm text-[#9FADBC]">Template</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
