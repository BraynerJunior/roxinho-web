import { DataTableHome } from "@/components/dashboard/DashboardHome/table-home";
import { HomeSectionCards } from "@/components/dashboard/DashboardHome/HomeSectionCards";

import { getUsers } from "@/actions/dashboard/get-users-action";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; perPage?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const perPage = Number(params?.perPage || 10);

  const { data, currentPage, totalItems, totalPages } = await getUsers(
    page,
    perPage
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <HomeSectionCards />
          <div className="max-w-full px-2 mt-8">
            <h1 className="text-xl text-center font-semibold">Usuários Cadastrados</h1>
            <DataTableHome
              data={data}
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
