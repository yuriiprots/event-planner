import { EventsProvider } from "../contexts/eventsContext";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <Header />
        <EventsProvider>
          <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </EventsProvider>
      </div>
    </div>
  );
}
