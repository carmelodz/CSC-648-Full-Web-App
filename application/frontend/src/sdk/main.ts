import apiClient from "./safetyHubAPI/ApiClient"; // eslint-disable-next-line
import { IAlertCreateDto, ISearchAlertDto } from "./safetyHubAPI/alerts/types";

async function main() {
  // ===========HealthCheck===========
  apiClient.getHealth().then(() => {
    // eslint-disable-next-line no-console
    console.log("nice");
  });

  // ===========Register===========
  /* apiClient.auth
    .register("moi@gmail.com", "AZERTYUIOP")
    .then((r) => console.log(r.data));

 // ===========Login===========
  apiClient.auth
    .login("moi@gmail.com", "AZERTYUIOP")
    .then((r) => console.log(r.data));

 // ===========Create Alert===========
   const alert: IAlertCreateDto = {
    lat: 48.8566,
    lng: 2.3522,
    severity: 1,
    type: "WEATHER",
    title: "Raining a lot",
    description: "ATTENTION",
    zipCode: "94014",
    countyName: "Tehama",
  };

  apiClient.alert
    .createAlert(alert)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

 // ===========Get Alerts===========
   apiClient.alert.getAlerts().then((alerts) => {
    console.log(alerts);
  });

 // ===========Get Alert===========
  apiClient.alert
    .getAlert("d1692978-2ce5-4fba-88ae-39b6154604ca")
    .then((alert) => {
      console.log("========================");
      console.log(alert);
    });

 // ===========Delete Alert===========
  apiClient.alert
    .deleteAlert("d854e42b-d393-4b03-bdc0-50974e56e8ea")
    .then(() => console.log("success"));

 // ===========Search Alert===========
  const searchOptions: ISearchAlertDto = {
    contentSearch: "Air",
    countySearch: [],
    types: ["HEALTH", "FIRE"],
    zipCode: "",
  };

  apiClient.alert.search(searchOptions).then((result) => console.log(result));

  // ===========Update Alert===========
  apiClient.alert
    .updateAlert("466105a6-c8e0-4038-85ce-27204598545d", { severity: 10 })
    .then((result) => console.log(result));

  // ===========Get Users===========
  apiClient.user.getUsers().then((user) => {
    console.log(user);
  });

  // ===========Update User===========
  apiClient.user
    .updateUser("8a91b7bd-9cbb-4c20-94c2-fa97bd49f574", {
      directorStatus: "PENDING",
      directorAlert: "FIRE",
    })
    .then((result) => console.log(result));

  // ===========Delete User===========
  apiClient.user
    .deleteUser("872dc90a-aec5-4d7e-b243-42b6ba715c5b")
    .then(() => console.log("success")); */
}

main();
