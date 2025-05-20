import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, MapPin } from "lucide-react";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Hearing: State vs. Johnson",
      date: "2023-05-15",
      time: "10:00 AM",
      location: "Courtroom 3A",
      type: "Hearing",
    },
    {
      id: 2,
      title: "Client Meeting: Smith",
      date: "2023-05-15",
      time: "2:00 PM",
      location: "Conference Room 2",
      type: "Meeting",
    },
    {
      id: 3,
      title: "Case Filing Deadline: Williams",
      date: "2023-05-18",
      time: "5:00 PM",
      location: "Online",
      type: "Deadline",
    },
    {
      id: 4,
      title: "Trial: Anderson Corp",
      date: "2023-05-20",
      time: "9:00 AM",
      location: "Courtroom 5B",
      type: "Trial",
    },
    {
      id: 5,
      title: "Document Review",
      date: "2023-05-22",
      time: "11:00 AM",
      location: "Office",
      type: "Task",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];

    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
            </CardTitle>
            <CardDescription>Manage your schedule and appointments</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button className="outline-button icon-button" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="outline-button icon-button" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {weekdays.map((day, index) => (
              <div key={index} className="text-center font-medium py-2 text-sm">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const eventsForDay = getEventsForDay(day);
              const isToday =
                day === new Date().getDate() &&
                currentMonth.getMonth() === new Date().getMonth() &&
                currentMonth.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-24 border p-1 ${day ? "bg-white" : "bg-slate-50"} ${
                    isToday ? "border-blue-500 border-2" : "border-slate-200"
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-right text-sm font-medium p-1">{day}</div>
                      <div className="space-y-1">
                        {eventsForDay.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${
                              event.type === "Hearing"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "Meeting"
                                ? "bg-green-100 text-green-800"
                                : event.type === "Deadline"
                                ? "bg-red-100 text-red-800"
                                : event.type === "Trial"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {event.time} - {event.title}
                          </div>
                        ))}
                        {eventsForDay.length > 2 && (
                          <div className="text-xs text-center text-slate-500">+{eventsForDay.length - 2} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled hearings, meetings, and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                <div
                  className={`w-2 h-full self-stretch rounded-full mr-4 ${
                    event.type === "Hearing"
                      ? "bg-blue-500"
                      : event.type === "Meeting"
                      ? "bg-green-500"
                      : event.type === "Deadline"
                      ? "bg-red-500"
                      : event.type === "Trial"
                      ? "bg-purple-500"
                      : "bg-slate-500"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      event.type === "Hearing"
                        ? "bg-blue-100 text-blue-800"
                        : event.type === "Meeting"
                        ? "bg-green-100 text-green-800"
                        : event.type === "Deadline"
                        ? "bg-red-100 text-red-800"
                        : event.type === "Trial"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
