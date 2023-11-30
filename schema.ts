/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/{language}/jobs": {
    get: {
      parameters: {
        query?: {
          /**
           * @example [
           *   "frontend",
           *   "fullstack"
           * ]
           */
          careerFields?: components["schemas"]["Tags"];
          /**
           * @example [
           *   "react",
           *   "nodejs"
           * ]
           */
          technologies?: components["schemas"]["Tags"];
          /**
           * @example [
           *   "it"
           * ]
           */
          industries?: components["schemas"]["Tags"];
          /**
           * @example [
           *   "contributor",
           *   "expert",
           *   "leader"
           * ]
           */
          jobLevels?: components["schemas"]["Tags"];
          /**
           * @example [
           *   "StartUp"
           * ]
           */
          companySizes?: components["schemas"]["Tags"];
          /**
           * @example [
           *   "german",
           *   "english"
           * ]
           */
          workLanguages?: components["schemas"]["Tags"];
          /**
           * @example [
           *   80,
           *   100
           * ]
           */
          workload?: components["schemas"]["Range"];
          /** @example 70 */
          homeOffice?: number;
          /**
           * @example [
           *   "Baden",
           *   "Lugano"
           * ]
           */
          states?: string[];
          /** @example 80000 */
          salary?: number;
          /** @example CHF */
          currency?: string;
          /**
           * @description Employer name. Case insensitive.
           * @example amag group ag
           */
          employerName?: string;
          /** @description For pagination: index of the first job to be sent */
          offset?: number;
          /** @description For pagination: limit of jobs to be sent */
          limit?: number;
        };
        path: {
          language: components["schemas"]["Language"];
        };
      };
      responses: {
        /** @description Get all or filtered and paginated jobs and active filters */
        200: {
          content: {
            "application/json": components["schemas"]["inline_response_200"];
          };
        };
        /** @description Invalid filters supplied */
        400: never;
        /** @description Language not found */
        404: never;
      };
    };
  };
  "/{language}/jobs/{id}": {
    get: {
      parameters: {
        path: {
          language: components["schemas"]["Language"];
          /** @description ID of the job */
          id: components["schemas"]["Id"];
        };
      };
      responses: {
        /** @description Get individual Job data */
        200: {
          content: {
            "application/json": components["schemas"]["Job"];
          };
        };
        /** @description Language or jobId not found */
        404: never;
      };
    };
  };
  "/{language}/filters": {
    get: {
      parameters: {
        query?: {
          userId?: components["schemas"]["Id"];
          boardId?: components["schemas"]["Id"];
        };
        path: {
          language: components["schemas"]["Language"];
        };
      };
      responses: {
        /** @description Get all filters' possible values */
        200: {
          content: {
            "application/json": components["schemas"]["Filters"];
          };
        };
        /** @description Language not found */
        404: never;
      };
    };
  };
  "/{language}/subscribe": {
    post: {
      parameters: {
        path: {
          language: components["schemas"]["Language"];
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["subscribe_body"];
        };
      };
      responses: {
        /** @description Subscription successful */
        200: {
          content: {
            "application/json": string;
          };
        };
        /** @description Invalid request body supplied */
        400: never;
      };
    };
  };
  "/{language}/save": {
    post: {
      parameters: {
        path: {
          language: components["schemas"]["Language"];
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["save_body"];
        };
      };
      responses: {
        /** @description Save successful */
        200: {
          content: {
            "application/json": string;
          };
        };
        /** @description Invalid request body supplied */
        400: never;
      };
    };
  };
  "/{language}/apply": {
    post: {
      parameters: {
        path: {
          language: components["schemas"]["Language"];
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["apply_body"];
        };
      };
      responses: {
        /** @description Application successful. */
        200: {
          content: {
            "application/json": string;
          };
        };
        /** @description Invalid request body supplied */
        400: never;
      };
    };
  };
  "/{language}/refer": {
    post: {
      parameters: {
        path: {
          language: components["schemas"]["Language"];
        };
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["refer_body"];
        };
      };
      responses: {
        /** @description Unique link for job referral */
        200: {
          content: {
            "application/json": string;
          };
        };
        /** @description Invalid request body supplied */
        400: never;
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @example 123 */
    Id: string;
    Address: {
      /** @example Wiener Str. */
      street?: string;
      /** @example Bern */
      city?: string;
      /** @example Bern */
      state?: string;
      /** @example Western Part of Switzerland */
      region?: string;
      /** @example Switzerland */
      country?: string;
      geoCoordinates?: components["schemas"]["GeoCoordinates"];
    };
    /** @example 47.4708538 */
    GeoCoordinate: string;
    GeoCoordinates: {
      latitude?: components["schemas"]["GeoCoordinate"];
      longitude?: components["schemas"]["GeoCoordinate"];
    };
    /** Format: date-time */
    DateTime: string;
    /**
     * @example [
     *   "tag1",
     *   "tag2",
     *   "tag3"
     * ]
     */
    Tags: string[];
    File: {
      /**
       * Format: base64
       * @example data:image/webp;base64,UklGRs61AABXRUJQVlA4WAoAAA
       */
      content?: string;
      lastModified?: number;
      /** @example cv.webp */
      name?: string;
      size?: number;
      /** @example image/webp */
      type?: string;
    };
    /**
     * @example {
     *   "amount": [
     *     40000,
     *     100000
     *   ],
     *   "currency": "CHF",
     *   "unit": "year"
     * }
     */
    SalaryRange: {
      amount?: components["schemas"]["Range"];
      currency?: string;
      unit?: string;
    };
    Employer: {
      id?: components["schemas"]["Id"];
      /** @example Baggenstos */
      name?: string;
      /** Format: url */
      logo?: string;
    };
    /**
     * @example [
     *   20,
     *   80
     * ]
     */
    Range: number[];
    /**
     * @default de
     * @enum {string}
     */
    Language: "de" | "en" | "fr";
    Job: {
      id?: components["schemas"]["Id"];
      /** @example React Engineer */
      title?: string;
      datePosted?: components["schemas"]["DateTime"];
      address?: components["schemas"]["Address"];
      employer?: components["schemas"]["Employer"];
      salary?: components["schemas"]["SalaryRange"];
      workload?: components["schemas"]["Range"];
      homeOffice?: components["schemas"]["Range"];
      tags?: components["schemas"]["Tags"];
      /** @enum {string} */
      jobLevel?: "contributor" | "expert" | "leader";
      /** Format: url */
      landingPageUrl?: string;
      /** Format: markup */
      responsibilities?: string;
      /** Format: markup */
      requirements?: string;
    };
    ActiveFilters: {
      careerFields?: components["schemas"]["Tags"];
      technologies?: components["schemas"]["Tags"];
      industries?: components["schemas"]["Tags"];
      workLanguages?: components["schemas"]["Tags"];
      jobLevels?: components["schemas"]["Tags"];
      companySizes?: components["schemas"]["Tags"];
      workload?: components["schemas"]["Range"];
      /** @example 70 */
      homeOffice?: number;
      salary?: number;
      /**
       * @example [
       *   "Baden",
       *   "Lugano"
       * ]
       */
      states?: string[];
    };
    Filters: {
      careerFields?: components["schemas"]["Tags"];
      technologies?: components["schemas"]["Tags"];
      industries?: components["schemas"]["Tags"];
      workLanguages?: components["schemas"]["Tags"];
      jobLevels?: components["schemas"]["Tags"];
      companySizes?: components["schemas"]["Tags"];
      workload?: components["schemas"]["Range"];
      homeOffice?: components["schemas"]["Range"];
      salary?: components["schemas"]["SalaryRange"];
      /**
       * @example [
       *   {
       *     "name": "German part of Switzerland",
       *     "states": [
       *       "Zürich",
       *       "Bern"
       *     ]
       *   },
       *   {
       *     "name": "Western Part of Switzerland",
       *     "states": [
       *       "Geneva"
       *     ]
       *   }
       * ]
       */
      regions?: components["schemas"]["Filters_regions"][];
    };
    Font: {
      /** @example Crimson Pro */
      name?: string;
      /**
       * Format: url
       * @example https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap
       */
      url?: string;
      /** @example 700 */
      weight?: string;
    };
    inline_response_200: {
      jobs?: components["schemas"]["Job"][];
      activeFilters?: components["schemas"]["ActiveFilters"];
      offset?: number;
      limit?: number;
      /** @description Length of the collection filtered by ActiveFilters, without pagination */
      length?: number;
    };
    subscribe_body: {
      /** Format: email */
      email?: string;
      activeFilters?: components["schemas"]["ActiveFilters"];
    };
    save_body: {
      /** Format: email */
      email?: string;
      jobId?: string;
    };
    apply_body: {
      /** Format: email */
      email?: string;
      /** @enum {string} */
      sex?: "man" | "woman" | "other";
      name?: string;
      message?: string;
      files?: components["schemas"]["File"][];
      /** Format: url */
      linkedIn?: string;
      jobIds?: components["schemas"]["Id"][];
    };
    refer_body: {
      /** Format: email */
      email?: string;
      jobId?: components["schemas"]["Id"];
    };
    Filters_regions: {
      name?: string;
      states?: string[];
    };
  };
  responses: never;
  parameters: {
    UserId?: components["schemas"]["Id"];
    BoardId?: components["schemas"]["Id"];
    Language: components["schemas"]["Language"];
    /**
     * @example [
     *   "frontend",
     *   "fullstack"
     * ]
     */
    CareerFields?: components["schemas"]["Tags"];
    /**
     * @example [
     *   "react",
     *   "nodejs"
     * ]
     */
    Technologies?: components["schemas"]["Tags"];
    /**
     * @example [
     *   "it"
     * ]
     */
    Industries?: components["schemas"]["Tags"];
    /**
     * @example [
     *   "contributor",
     *   "expert",
     *   "leader"
     * ]
     */
    JobLevels?: components["schemas"]["Tags"];
    /**
     * @example [
     *   80,
     *   100
     * ]
     */
    Workload?: components["schemas"]["Range"];
    /** @example 70 */
    HomeOffice?: number;
    /** @example CHF */
    Currency?: string;
    /**
     * @example [
     *   "Baden",
     *   "Lugano"
     * ]
     */
    States?: string[];
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
