const steps = [
    {
      title: "Sign Up and Choose Your Course",
      description:
        "Create your account quickly with just your email or social media login, then explore a wide range",
    },
    {
      title: "Onboarding",
      description:
        "Create your account quickly with just your email or social media login, then explore a wide range",
    },
    {
      title: "Start Learning",
      description:
        "Create your account quickly with just your email or social media login, then explore a wide range",
    },
  ];
  
  const RegisterSteps = () => {
    return (
      <div className="flex flex-col space-y-8 ">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center ">
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-5 top-14 h-full w-[2px] bg-blue-500"></div>
            )}
  
            {/* Step Icon */}
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-blue-500 mr-4">
              ●
            </div>
  
            {/* Step Content */}
            <div className="flex flex-col w-66">
              <h3 className="text-lg font-semibold text-black inline-block whitespace-nowrap">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default RegisterSteps;
  