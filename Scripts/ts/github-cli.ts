/*
 * github-cli.ts
 *
 *   Created: 2022-11-27-05:39:27
 *   Modified: 2022-12-05-04:14:53
 *
 *   Author: David G. Moore, Jr. <david@dgmjr.io>
 *
 *   Copyright © 2022-2023 David G. Moore, Jr., All Rights Reserved
 *      License: MIT (https://opensource.org/licenses/MIT)
 */

import { GITHUB_API_RESPONSE_CONTENT_TYPE, GITHUB_API_VERSION, GITHUB_API_VERSION_HEADER_NAME, GITHUB_API_STANDARD_HEADERS } from "./constants.js";
import { PackageType } from "./github-cli-types.js";
import { Octokit } from "@octokit/core";
import { SemVer } from "semver";

export async function deletePackageVersionAsync(orgId: string, packageId: string, version: SemVer, package_type: PackageType = "nuget", token: string | undefined): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    console.log(`Attempting to authorize with token "${token}...`);
    if (token != undefined) {
      var octokit = new Octokit({ auth: token });
    }
    else {
      throw "Error: no authorization token was passed.";
    }

    try {
      console.log(`Authorizing with token "${token}...`);
      var versions = await octokit.request("GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
        {
          org: orgId,
          package_type,
          package_name: packageId,
          headers: GITHUB_API_STANDARD_HEADERS
        });

      console.log("Using GitHub API to delete package version...");
      var versionToDelete = versions.data.find(v => v.name == version.format());

      const versionId = versionToDelete?.id;

      if (versionId && versionId != undefined) {
        var deleteResponse = await octokit.request("DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}",
          {
            org: orgId,
            package_type,
            package_name: packageId,
            package_version_id: versionId,
            headers: GITHUB_API_STANDARD_HEADERS
          });
        if (deleteResponse.status != 204) {
          console.log(`The package version was not deleted because the server encountered an error: ${deleteResponse.status}`);
          reject(deleteResponse.status);
        }
        else {
          console.log(`The package version ${version} was deleted successfully.`);
        }
      }
      else {
        console.log(`The package version ${version} was not found. Skipping...`);
      }
      resolve();
    }
    catch (ex) {
      reject(ex);
    }
  });
}

export async function deletePackageAsync(orgId: string, packageId: string, token: string | undefined): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    if (token != undefined) {
      var octokit = new Octokit({ auth: token });
    }
    else {
      throw "Error: no authorization token was passed.";
    }
    var deletePackageResultJsonString = "";
    console.log(`Deleting package ${packageId}...`);
    try {
      var deleteResponse = await octokit.request("DELETE '/orgs/{org}/GET /user/packages/GET /user/packages/{package_type}/{package_name}",
        {
          org: orgId,
          package_type: "nuget",
          package_name: packageId,
          headers: GITHUB_API_STANDARD_HEADERS
        });
      if (deleteResponse.status == 204) {
        console.log("The package was deleted successfully.")
        resolve();
      }
      else {
        console.log(`The package ${packageId} was not deleted because the server encountered an error: ${deleteResponse.status}`);
        reject(deleteResponse.status);
      }
    }
    catch (ex) {
      reject(ex);
    }
  });
}
