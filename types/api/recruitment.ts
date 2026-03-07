export type RecruitmentSalaryType = "hourly" | "monthly" | "daily" | "weekly" | "yearly";

export type RecruitmentShiftTypeFilter = "onsite" | "remote" | "hybrid";

export type RecruitmentSortBy =
  | "newest"
  | "highest_rating"
  | "most_experience"
  | "best_fit";

type CsvParam<T extends string = string> = T[] | string;

export interface RecruitmentFilterQuery {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  businessId?: string;
  salaryType?: RecruitmentSalaryType | string;
  shiftType?: RecruitmentShiftTypeFilter | string;
  shiftTypes?: CsvParam<RecruitmentShiftTypeFilter>;
  jobType?: string;
  jobTypes?: CsvParam;
  isActive?: boolean;
  skills?: CsvParam;
  gender?: string;
  experience?: string;
  experienceLevels?: CsvParam;
  ageMin?: number;
  ageMax?: number;
  shiftStartTime?: string;
  shiftEndTime?: string;
  salaryMin?: number;
  salaryMax?: number;
  minSalary?: number;
  maxSalary?: number;
  numberOfOpenings?: number;
  filledPositions?: number;
  postedById?: string;
  isClosed?: boolean;
  isFeatured?: boolean;
  roleIds?: CsvParam;
  location?: string;
  maxDistanceKm?: number;
  verifiedOnly?: boolean;
  sortBy?: RecruitmentSortBy;
}
