/*
 * constants.ts
 *
 *   Created: 2023-03-28-11:52:17
 *   Modified: 2023-03-28-11:52:17
 *
 *   Author: David G. Moore, Jr. <david@dgmjr.io>
 *
 *   Copyright © 2022 - 2023 David G. Moore, Jr., All Rights Reserved
 *      License: MIT (https://opensource.org/licenses/MIT)
 */

export const GITHUB_API_URL = "https://api.github.com";
export const GITHUB_API_VERSION = '2022-11-28';
export const GITHUB_API_VERSION_HEADER_NAME = "X-GitHub-Api-Version"
export const GITHUB_API_RESPONSE_CONTENT_TYPE = "application/vnd.github.v3+json";
export const GITHUB_API_VERSION_HEADER = { [GITHUB_API_VERSION_HEADER_NAME]: GITHUB_API_VERSION };
export const GITHUB_API_ACCEPT_HEADER = { Accept: GITHUB_API_RESPONSE_CONTENT_TYPE };
export const GITHUB_API_STANDARD_HEADERS = {
  [GITHUB_API_VERSION_HEADER_NAME]: GITHUB_API_VERSION,
  Accept: GITHUB_API_RESPONSE_CONTENT_TYPE
};
