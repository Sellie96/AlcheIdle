import { SkillTypes } from "../Skills";

export interface Courses {
  monkeybars: Course;
  logbeam: Course;
  spikes: Course;
  ropeswing: Course;
  rooftop: Course;
  maze: Course;
  lavatrail: Course;
  rafting: Course;
}

export interface Course {
  name: string;
  skillType: String;
  level: number;
  xp: number;
  reward: string;
  time: number;
  value: number;
}

export enum CourseNames {
  monkeybars = 'monkeybars',
  logbeam = 'logbeam',
  spikes = 'spikes',
  ropeswing = 'ropeswing',
  rooftop = 'rooftop',
  maze = 'maze',
  lavatrail = 'lavatrail',
  rafting = 'rafting',
}

export const courseTypes: Courses = {
  monkeybars: {
    name: CourseNames.monkeybars,
    skillType: SkillTypes.agility,
    level: 1,
    xp: 10,
    reward: CourseNames.monkeybars,
    time: 3,
    value: 1,
  },
  logbeam: {
    name: CourseNames.logbeam,
    skillType: SkillTypes.agility,
    level: 10,
    xp: 15,
    reward: CourseNames.logbeam,
    time: 4,
    value: 5,
  },
  spikes: {
    name: CourseNames.spikes,
    skillType: SkillTypes.agility,
    level: 30,
    xp: 25,
    reward: CourseNames.spikes,
    time: 5,
    value: 10,
  },
  ropeswing: {
    name: CourseNames.ropeswing,
    skillType: SkillTypes.agility,
    level: 45,
    xp: 45,
    reward: CourseNames.ropeswing,
    time: 6,
    value: 20,
  },
  rooftop: {
    name: CourseNames.rooftop,
    skillType: SkillTypes.agility,
    level: 60,
    xp: 60,
    reward: CourseNames.rooftop,
    time: 8,
    value: 35,
  },
  maze: {
    name: CourseNames.maze,
    skillType: SkillTypes.agility,
    level: 75,
    xp: 75,
    reward: CourseNames.maze,
    time: 10,
    value: 50,
  },
  lavatrail: {
    name: CourseNames.lavatrail,
    skillType: SkillTypes.agility,
    level: 80,
    xp: 85,
    reward: CourseNames.lavatrail,
    time: 12,
    value: 75,
  },
  rafting: {
    name: CourseNames.rafting,
    skillType: SkillTypes.agility,
    level: 90,
    xp: 150,
    reward: CourseNames.rafting,
    time: 20,
    value: 100,
  },
};

export const coursesToRun: Course[] = [
  courseTypes.monkeybars,
  courseTypes.logbeam,
  courseTypes.spikes,
  courseTypes.ropeswing,
  courseTypes.rooftop,
  courseTypes.maze,
  courseTypes.lavatrail,
  courseTypes.rafting,
];

export const lockedCourses: number[] = [
  courseTypes.monkeybars.level,
  courseTypes.logbeam.level,
  courseTypes.spikes.level,
  courseTypes.ropeswing.level,
  courseTypes.rooftop.level,
  courseTypes.maze.level,
  courseTypes.lavatrail.level,
  courseTypes.rafting.level,
];
