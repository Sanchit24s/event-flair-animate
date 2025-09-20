import { useEffect, useRef } from "react";

const TrustIndicators = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        };

        loadGSAP();
    }, []);

    const indicators = [
        { value: "50+", label: "Events Planned" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "5+", label: "Years Experience" },
        { value: "80%", label: "Repeat Clients" },
    ];

    return (
        <section
            ref={sectionRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border mb-16"
        >
            {indicators.map((item, index) => (
                <div key={index} className="text-center">
                    <div className="text-3xl font-playfair font-bold text-navy mb-2">
                        {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                        {item.label}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default TrustIndicators;
