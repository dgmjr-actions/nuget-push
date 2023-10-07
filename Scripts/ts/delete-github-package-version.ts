/*
 * delete-github-package-version.ts
 *
 *   Created: 2022-11-27-05:39:27
 *   Modified: 2022-12-05-04:15:02
 *
 *   Author: David G. Moore, Jr. <david@dgmjr.io>
 *
 *   Copyright © 2022-2023 David G. Moore, Jr., All Rights Reserved
 *      License: MIT (https://opensource.org/licenses/MIT)
 */

import process from 'process';
import { deletePackageVersionAsync } from "./github-cli";

if (process.argv.length < 3) {
  console.error("Usage: delete-github-package-version <orgId> <packageId> <version> [gh token]");
  process.exit();
}

var orgId = process.argv.slice(2)[0];
var packageId = process.argv.slice(2)[1];
var version = process.argv.slice(2)[2];
var token: string = (process.argv.slice(2).length == 4 ? process.argv.slice(2)[3] : process.env.GITHUB_TOKEN) as string;

(async () => {
  await deletePackageVersionAsync(orgId, packageId, version, token).then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1) });
})();
