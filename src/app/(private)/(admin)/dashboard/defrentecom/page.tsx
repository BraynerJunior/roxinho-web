import { SiteHeader } from "@/components/ui/site-header";
import { findAllSummariesInterviews } from "@/lib/interview/queries";
import { InterviewManagementClient } from "@/components/admin-dashboard/DashboardDeFrenteCom/InterviewManagementClient";

export default async function DeFrenteComAdminDashboard({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; perPage?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const perPage = Number(params?.perPage || 10);

  const { data, currentPage, totalItems, totalPages } =
    await findAllSummariesInterviews(page, perPage);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SiteHeader title="De Frente Com" />
          <div className="max-w-full px-2 mt-8">
            <InterviewManagementClient
              initialData={data}
              totalPages={totalPages}
              totalItems={totalItems}
              currentPage={currentPage}
              perPage={perPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
