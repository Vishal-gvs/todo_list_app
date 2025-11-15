import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Shield,
  Zap,
  LayoutGrid,
  LogIn,
  PlusCircle,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import RotatingText from "../RBD/RotatingText/RotatingText";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      {/* Navigation */}
      <nav className="bg-background/70 backdrop-blur-lg border-b border-border shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-primary animate-pulse" />
              <Link to="/">
                <span className="text-xl font-bold tracking-tight">
                  TodoApp
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                <PlusCircle className="w-4 h-4" />
                Get Started
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 animate-fade-in">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              Organize Your Life,
              <span className="text-primary block">One Task at a Time</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              A powerful, multi-user todo application that helps you and your
              team stay organized, focused, and productive. Simple, secure, and
              designed for modern workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Link to="/register">
                <button className="bg-primary text-primary-foreground hover:scale-105 px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-transform">
                  Start Free Today
                </button>
              </Link>
              <Link
                to="/login"
                className="border border-border hover:border-foreground text-muted-foreground hover:text-foreground hover:scale-105 px-8 py-3 rounded-lg text-lg font-semibold transition-transform"
              >
                Sign In
              </Link>
            </div>
          </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <RotatingText
              texts={[
                "Everything You Need",
                "To Stay Organized",
                "Built for You",
              ]}
              mainClassName="text-3xl md:text-4xl font-bold mb-4 px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently
              and collaborate with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Task Management",
                desc: "Create, organize, and track your tasks with ease. Set priorities and due dates.",
                Icon: CheckCircle,
                bg: "bg-primary/10",
                color: "text-primary",
              },
              {
                title: "Multi-user",
                desc: "Secure, individual workspaces for each user. Your tasks, your privacy.",
                Icon: Users,
                bg: "bg-green-100 dark:bg-green-900",
                color: "text-green-600 dark:text-green-300",
              },
              {
                title: "Secure",
                desc: "JWT authentication and encrypted data storage keep your information safe.",
                Icon: Shield,
                bg: "bg-purple-100 dark:bg-purple-900",
                color: "text-purple-600 dark:text-purple-300",
              },
              {
                title: "Fast & Modern",
                desc: "Built with React and Vite for lightning-fast performance and modern UX.",
                Icon: Zap,
                bg: "bg-orange-100 dark:bg-orange-900",
                color: "text-orange-600 dark:text-orange-300",
              },
            ].map(({ title, desc, Icon, bg, color }, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-md hover:shadow-xl bg-background border border-border transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <div
                  className={`${bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their tasks more
            effectively.
          </p>
          <Link
            to="/register"
            className="bg-background text-primary hover:bg-muted px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">TodoApp</span>
          </div>
          <p className="text-muted-foreground text-sm">
<<<<<<< HEAD
            © 2024 TodoApp. Built with ❤️ using the MERN stack.
=======
            TodoApp. Built using the MERN stack.
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
          </p>
        </div>
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default LandingPage;
=======
export default LandingPage;
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
