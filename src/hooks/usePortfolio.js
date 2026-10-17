import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { profileApi } from "@/api/profile";
import { skillsApi } from "@/api/skills";
import { educationApi, experiencesApi } from "@/api/experience";
import { projectsApi } from "@/api/projects";
import { cleanParams } from "@/utils/text";

export const useProfile = () => useQuery({ queryKey: ["profile"], queryFn: profileApi.get });
export const useSkills = (params = {}) => useQuery({ queryKey: ["skills", params], queryFn: () => skillsApi.list(params) });
export const useExperiences = () => useQuery({ queryKey: ["experiences"], queryFn: () => experiencesApi.list() });
export const useEducation = () => useQuery({ queryKey: ["education"], queryFn: () => educationApi.list() });

export const useProjects = (params = {}) =>
  useQuery({ queryKey: ["projects", params], queryFn: () => projectsApi.list(cleanParams(params)), placeholderData: keepPreviousData });

export const useProject = (slug) => 
  useQuery({ 
    queryKey: ["project", slug], 
    queryFn: () => projectsApi.get(slug), 
    enabled: Boolean(slug), // <--- Added this line
    retry: false 
  });