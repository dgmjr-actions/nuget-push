/*
 * github-cli-types.ts
 *
 *   Created: 2022-11-27-05:39:27
 *   Modified: 2022-12-05-04:14:47
 *
 *   Author: David G. Moore, Jr. <david@dgmjr.io>
 *
 *   Copyright © 2022-2023 David G. Moore, Jr., All Rights Reserved
 *      License: MIT (https://opensource.org/licenses/MIT)
 */
import { SemVer } from "semver";

export interface PackageVersion {
  id: number;
  name: string;
  package_html_url: string;
  url: string;
  created_at: string;
  updated_at: string;
  visibility: string;
  package_type: PackageType;
  downloads_count: number;
  description: string;
  html_url: string;
  license: string;
}

export interface ApiMessage {
  message: string;
  documentation_url: string;
}

export type PackageType = "nuget" | "npm" | "docker" | "maven" | "rubygems" | "container";


export const toSemVer = (stringVer: string | undefined) => new SemVer(stringVer ?? "0.0.0");
export const toPackageType = (stringType: string | undefined) => stringType as PackageType;
