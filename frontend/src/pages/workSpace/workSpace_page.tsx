import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Card,
} from "@/components";
import {
  Trello,
  Search,
  HelpCircle,
  Bell,
  Plus,
  LayoutGrid,
  Filter,
  Share2,
  MoreHorizontal,
  Calendar,
  Table,
} from "lucide-react";

export function WorkSpace() {
  return (
    <div className="min-h-screen bg-[#1D2125] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#1D2125] border-b border-[#333B44] px-4 h-[44px] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#333B44]"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#282E33] border-[#333B44] text-white">
              <DropdownMenuItem className="hover:bg-[#333B44]">
                <Trello className="mr-2 h-4 w-4" /> Trello
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#333B44]">
                <Calendar className="mr-2 h-4 w-4" /> Calendar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-2">
            <Trello className="h-5 w-5 text-[#579DFF]" />
            <span className="font-semibold">Trello Workspace</span>
            <span className="text-xs bg-[#333B44] px-2 py-1 rounded">
              Premium
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
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

          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
            14 days left
          </span>

          <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="hover:bg-[#333B44] h-8">
              <Filter className="h-4 w-4 mr-1" /> Filters
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="hover:bg-[#333B44] h-8">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#282E33] border-[#333B44] text-white">
                <DialogHeader>
                  <DialogTitle>Share board</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Email address or name"
                    className="bg-[#22272B] border-[#333B44]"
                  />
                  <Button className="w-full bg-[#579DFF] hover:bg-[#4C8FE9]">
                    Share
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="hover:bg-[#333B44]">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
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

            <div className="pt-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#9FADBC]">
                  Workspace views
                </span>
                <span className="text-xs bg-[#6E5DC6] px-2 py-0.5 rounded">
                  PREMIUM
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] text-sm"
                >
                  <Table className="mr-2 h-4 w-4" /> Table
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] text-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" /> Calendar
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-sm font-medium text-[#9FADBC]">
                Your boards
              </span>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44] bg-[#282E33]"
                >
                  <div className="w-4 h-4 rounded bg-red-400 mr-2" />
                  1-on-1 Meeting Agenda
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#333B44]"
                >
                  <div className="w-4 h-4 rounded bg-pink-400 mr-2" />
                  My first trello
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Board Content */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Info Column */}
            <div className="space-y-4">
              <div className="bg-[#22272B] rounded-md">
                <div className="p-3 flex items-center justify-between">
                  <h3 className="font-medium">Info</h3>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-[#333B44]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-[#333B44]"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Card className="m-2 bg-[#282E33] border-[#333B44]">
                  <div className="p-3">
                    <h4 className="font-medium mb-2">How to use this board</h4>
                    <div className="flex items-center text-sm text-[#9FADBC]">
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      <span>1</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Other Columns */}
            {["Manager's Topics", "Discussion", "Goals"].map((title, index) => (
              <div key={index} className="space-y-4 cursor-pointer">
                <div className="bg-[#22272B] rounded-md">
                  <div className="p-3 flex items-center justify-between">
                    <h3 className="font-medium">{title}</h3>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-[#333B44]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-[#333B44]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-3 hover:bg-[#333B44] text-[#9FADBC]"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add a card
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
