import { useEffect, useRef, useState } from "react";

export const useObserver = (
	callback: () => {},
	options: {
		stoppingCondition?: boolean;
	} & Partial<IntersectionObserverInit>
) => {
	const ref = useRef(null);
	const [loading, setLoading] = useState(false);

	const { stoppingCondition, ...rest } = options;

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || stoppingCondition || loading)
					return;

				setLoading(true);
				await callback();
				setLoading(false);
			},
			{
				root: null,
				rootMargin: "256px",
				threshold: 0.0,
				...rest,
			}
		);

		const { current } = ref;

		if (current) observer.observe(current);

		return () => {
			if (current) observer.disconnect();
		};
	});

	return ref;
};
