import { Link } from "react-router-dom";
import { Gavel, Scale, FileText, Calendar, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">KT Judiciary Management System</h1>
            <p className="text-xl mb-8">A comprehensive platform for efficient judicial process management</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-slate-100 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-slate-100 text-slate-100 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Gavel className="h-10 w-10 text-slate-700" />}
              title="Case Management"
              description="Track and manage cases efficiently with comprehensive case details, history, and status updates."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-slate-700" />}
              title="Hearing Scheduling"
              description="Schedule, manage, and get reminders for court hearings and appointments."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-slate-700" />}
              title="Document Management"
              description="Securely store, access, and share legal documents and case files."
            />
            <FeatureCard
              icon={<Scale className="h-10 w-10 text-slate-700" />}
              title="Role-Based Access"
              description="Tailored interfaces for Judges, Lawyers, Clerks, Prosecutors, and Clients."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-slate-700" />}
              title="Report Generation"
              description="Generate and export comprehensive reports for cases, hearings, and performance metrics."
            />
            <FeatureCard
              icon={<Gavel className="h-10 w-10 text-slate-700" />}
              title="Legal Resources"
              description="Access to legal references, precedents, and resources to support case preparation."
            />
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tailored for Every Role</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoleCard
              title="Judges"
              description="Manage court schedules, review case details, and issue orders efficiently."
            />
            <RoleCard
              title="Lawyers"
              description="Track client cases, manage documents, and stay updated on hearing schedules."
            />
            <RoleCard
              title="Clerks"
              description="Organize court records, manage case filings, and assist with administrative tasks."
            />
            <RoleCard
              title="Prosecutors"
              description="Prepare cases, track investigations, and manage court appearances."
            />
            <RoleCard
              title="Clients"
              description="Monitor case progress, access documents, and stay informed about upcoming hearings."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KT Judiciary Management</h3>
              <p className="text-slate-300">Streamlining judicial processes for efficiency and transparency.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="#" className="hover:text-white">Features</Link></li>
                <li><Link to="#" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-slate-300">
                Email: support@ktjudiciary.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; {new Date().getFullYear()} KT Judiciary Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
}

function RoleCard({ title, description }: RoleCardProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
