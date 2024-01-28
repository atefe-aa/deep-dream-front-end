import { Statistics } from "../../modules/statistics/Statistics";
import { Registrations } from "../../modules/tests/Registrations";
import {ProjectCollection} from 'cytomine-client';

const DashboardWrapper = () => {
  
  const collection = new ProjectCollection({
    withMembersCount: true,
    withLastActivity: true,
    withCurrentUserRoles: true,
    withCurrentUserPublicKey: true,
  });
  console.log(collection);

  return (
    <>
      <Statistics />
      <Registrations />
    </>
  );
};

export { DashboardWrapper };
