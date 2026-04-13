import PageContainer from "@/components/layout/PageContainer";
import ProfileCard from "@/components/profile/ProfileCard";

const user = {
  name: "Ariana Wells",
  email: "ariana.wells@example.com",
  addresses: [
    {
      id: "home",
      label: "Home",
      value: "45 Pine Street, Brooklyn, NY 11201",
    },
    {
      id: "office",
      label: "Office",
      value: "890 Market Ave, San Francisco, CA 94105",
    },
  ],
  orders: [
    { id: "ORD-2026-148", items: 3, total: 214, status: "Delivered" },
    { id: "ORD-2026-133", items: 2, total: 126, status: "In Transit" },
    { id: "ORD-2026-121", items: 1, total: 84, status: "Delivered" },
  ],
};

export default function ProfilePage() {
  return (
    <PageContainer className="pt-10 sm:pt-14">
      <ProfileCard user={user} />
    </PageContainer>
  );
}
