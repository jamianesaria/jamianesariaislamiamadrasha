export const metadata = {
  title: "Sanity Studio | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা",
  description: "Administrative Content Management Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-white text-black m-0 p-0">
      {children}
    </div>
  );
}

