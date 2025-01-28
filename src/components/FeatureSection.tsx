export default function FeatureSection() {
    // FeatureCard Component inside FeatureSection
    const FeatureCard = ({
      icon,
      title,
      description,
    }: {
      icon: string;
      title: string;
      description: string;
    }) => (
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  
    return (
      <section
        id="features"
        className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <FeatureCard
          icon="🚀"
          title="Instant Setup"
          description="Generate a room link in seconds. No account required."
        />
        <FeatureCard
          icon="🔒"
          title="Secure"
          description="Passcode protection for your private conversations."
        />
        <FeatureCard
          icon="💻"
          title="Cross-Platform"
          description="Works on any device with a modern web browser."
        />
      </section>
    );
  }
  