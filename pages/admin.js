import AdminDashboard from "../components/AdminDashboard";
import Navbar from "../components/Navbar";
import { generateNextSeo } from 'next-seo/pages'; // Corrected import
import Head from 'next/head';

export default function Admin() {
  const seoTags = generateNextSeo({ // Use generateNextSeo function
    title: "Admin Dashboard - 이상훈 Portfolio",
    description: "Manage content and resume for 이상훈's portfolio.",
    canonical: "https://www.yourwebsite.com/admin", // Replace with your actual website URL
    noindex: true, // Prevent indexing of the admin page
  });

  return (
    <>
      <Head>
        {seoTags}
      </Head>
      <Navbar />
      <div className="pt-20 dark:bg-gray-900 min-h-screen text-white"> {/* Added padding to account for fixed navbar */}
        <AdminDashboard />
      </div>
    </>
  );
}
