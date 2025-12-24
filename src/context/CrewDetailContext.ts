import { createContext, useContext } from 'react';
import { Crew } from '@/types';

export const CrewDetailContext = createContext<{
  crewId?: Crew['id'];
  myRole?: 'LEADER' | 'STAFF' | 'MEMBER';
}>({ crewId: undefined, myRole: undefined });

export const useCrewRole = () => {
  const context = useContext(CrewDetailContext);
  return context;
};
