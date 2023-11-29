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
import { deletePackageVersionAsync } from "./github-cli.js";
import { PackageType, toPackageType, toSemVer } from './github-cli-types.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { SemVer } from "semver";
import { PromiseValue, Promisable, Except } from "type-fest";

// const Yargs = yargs(hideBin(process.argv)).options(
//   {
//     "org": { "type": "string", "describe": "The organization that owns the package", "demandOption": true, "string": true, "message": "The organization is required", "alias": ["o", "organization", "org"] },
//     "package-id": { "type": "string", "describe": "The package's ID/name", "demandOption": true, "string": true, "message": "The package ID is required", "alias": ["i", "id", "package-id", "pkgid"] },
//     "package-version": { "describe": "The package's semver version number", "demandOption": true, "message": "Package version is required", "alias": ["v", "version", "package-version"], "coerce": toSemVer },
//     "type": { "type": "string", "describe": "The package's type (one of npm, maven, rubygems, docker, nuget, container)", "choices": ["npm", "maven", "rubygems", "docker", "nuget", "container"], "alias": ["t", "type", "package-tyoe"], "default": "nuget", "coerce": toPackageType },
//     "token": { "type": "string", "describe": "The GitHub API token", "alias": ["token", "k"], "string": true, "default": process.env.GITHUB_TOKEN },
//     "help": { "alias": "h" }
//   })
//   // .showHelpOnFail(true)
//   // .help()
//   ;

// const argv = Yargs.argv;

// const args = await argv;

// const orgId = args.org;
// const packageId = args.packageId;
// const version = args.packageVersion;
// const packageType: PackageType = args.type;
// const token = args.token;

// console.log(`Args: org: ${orgId}, packageId: ${packageId}, version: ${version.format()}, packageType: ${packageType}, token: ${token}`);

// if (orgId === undefined) {
//   throw new Error("Organization is required");
// }

// if (packageId === undefined) {
//   throw new Error("Package ID is required");
// }

// if (version === undefined) {
//   throw new Error("Package version is required");
// }

// if (packageType === undefined) {
//   throw new Error("Package type is required");
// }

// if (token === undefined) {
//   throw new Error("GitHub API token is required");
// }

// console.log(`Deleting package version ${version.format()} of ${packageId} from ${orgId}...`);
// await deletePackageVersionAsync(orgId, packageId, version, packageType, token);





const argv = process.argv.join(' ');
console.log(`argv: ${argv}`);


function getArg(...sentinels: string[]): string | undefined {
  for (var i = 0; i < sentinels.length; i++) {
    let sentinel = sentinels[i];
    let regex = new RegExp(`^.*--${sentinel}(?:[=:]|\\s*)(?<value>[\\S]*).*$`);
    console.log(`regex: ${regex}`);
    if (regex.test(argv))
      return argv.match(regex)?.groups!["value"] ?? undefined;
  }
  return undefined;
};

const orgId = getArg("org", "organization");
const packageId = getArg("id", "package-id", "pkgid");
const version = toSemVer(getArg("version", "package-version"));
const packageType: PackageType = toPackageType(getArg("type", "package-type"));
const token = getArg("token", "k", "github-token");

console.log(`Args: org: ${orgId}, packageId: ${packageId}, version: ${version.format()}, packageType: ${packageType}, token: ${token}`);

if (orgId === undefined) {
  throw new Error("Organization is required");
}

if (packageId === undefined) {
  throw new Error("Package ID is required");
}

if (version === undefined) {
  throw new Error("Package version is required");
}

if (packageType === undefined) {
  throw new Error("Package type is required");
}

if (token === undefined) {
  throw new Error("GitHub API token is required");
}

await deletePackageVersionAsync(orgId, packageId, version, packageType, token);

// console.log(`main: ${main}`);

