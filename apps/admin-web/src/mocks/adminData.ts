/**
 * Mock admin data.
 *
 * The API only exposes create/get for users and activities so far (see
 * apps/api-server/src/modules) — there are no list, report, or broadcast
 * endpoints yet. This module stands in for those until the MVP phase wires
 * up the real admin endpoints; shapes are kept close to what those
 * endpoints will likely return so swapping in `useApi(...)` later is a
 * small change, not a rewrite.
 */

export type MemberStatus = 'active' | 'pending' | 'suspended' | 'banned';

export interface Member {
  id: string;
  name: string;
  email: string;
  status: MemberStatus;
  verified: boolean;
  sports: string[];
  location: string;
  joinedAt: string;
  activitiesJoined: number;
  reportsAgainst: number;
}

export type ActivityStatus = 'open' | 'full' | 'cancelled' | 'completed';

export interface AdminActivity {
  id: string;
  title: string;
  sport: string;
  hostName: string;
  location: string;
  startAt: string;
  capacity: number;
  joined: number;
  status: ActivityStatus;
  featured: boolean;
}

export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';
export type ReportType = 'user' | 'activity' | 'message';

export interface Report {
  id: string;
  type: ReportType;
  targetLabel: string;
  reason: string;
  details: string;
  reporterName: string;
  createdAt: string;
  status: ReportStatus;
}

export interface Broadcast {
  id: string;
  audience: string;
  message: string;
  sentAt: string;
  recipients: number;
  status: 'sent' | 'scheduled';
}

export const MEMBERS: Member[] = [
  { id: 'u1', name: 'Aroha Ngata', email: 'aroha.ngata@gmail.com', status: 'active', verified: true, sports: ['Basketball', 'Running Club'], location: 'Ponsonby, Auckland', joinedAt: '2026-06-02', activitiesJoined: 14, reportsAgainst: 0 },
  { id: 'u2', name: 'Liam Carter', email: 'liam.carter92@outlook.com', status: 'active', verified: true, sports: ['Tennis'], location: 'Mission Bay, Auckland', joinedAt: '2026-06-14', activitiesJoined: 6, reportsAgainst: 0 },
  { id: 'u3', name: 'Priya Nair', email: 'priya.nair@aucklanduni.ac.nz', status: 'pending', verified: false, sports: ['Volleyball', 'Futsal'], location: 'Grafton, Auckland', joinedAt: '2026-08-20', activitiesJoined: 0, reportsAgainst: 0 },
  { id: 'u4', name: 'Marcus Chen', email: 'marcus.chen88@gmail.com', status: 'active', verified: true, sports: ['Basketball', 'Padel'], location: 'Newmarket, Auckland', joinedAt: '2026-05-11', activitiesJoined: 22, reportsAgainst: 1 },
  { id: 'u5', name: 'Sione Taufa', email: 'sione.taufa@gmail.com', status: 'suspended', verified: true, sports: ['Futsal'], location: 'Mangere, Auckland', joinedAt: '2026-04-28', activitiesJoined: 9, reportsAgainst: 3 },
  { id: 'u6', name: 'Emily Wilson', email: 'emily.wilson@hotmail.com', status: 'active', verified: true, sports: ['Running Club', 'Tennis'], location: 'Devonport, Auckland', joinedAt: '2026-07-03', activitiesJoined: 11, reportsAgainst: 0 },
  { id: 'u7', name: 'Kavya Sharma', email: 'kavya.sharma@gmail.com', status: 'active', verified: false, sports: ['Volleyball'], location: 'Epsom, Auckland', joinedAt: '2026-07-29', activitiesJoined: 3, reportsAgainst: 0 },
  { id: 'u8', name: 'Jack Thompson', email: 'jack.t.sport@gmail.com', status: 'banned', verified: true, sports: ['Basketball'], location: 'Henderson, Auckland', joinedAt: '2026-03-15', activitiesJoined: 17, reportsAgainst: 5 },
  { id: 'u9', name: 'Grace Kim', email: 'grace.kim@aucklanduni.ac.nz', status: 'active', verified: true, sports: ['Padel', 'Tennis'], location: 'City Centre, Auckland', joinedAt: '2026-08-05', activitiesJoined: 2, reportsAgainst: 0 },
  { id: 'u10', name: 'Ben Ropata', email: 'ben.ropata@gmail.com', status: 'active', verified: true, sports: ['Futsal', 'Basketball'], location: 'Otahuhu, Auckland', joinedAt: '2026-06-21', activitiesJoined: 8, reportsAgainst: 0 },
];

export const ACTIVITIES: AdminActivity[] = [
  { id: 'a1', title: 'Sunday Pickup Basketball', sport: 'Basketball', hostName: 'Marcus Chen', location: 'Victoria Park Courts', startAt: '2026-08-31T09:00:00', capacity: 10, joined: 10, status: 'full', featured: true },
  { id: 'a2', title: 'Weeknight Doubles Tennis', sport: 'Tennis', hostName: 'Liam Carter', location: 'ASB Tennis Centre', startAt: '2026-09-02T18:30:00', capacity: 4, joined: 3, status: 'open', featured: false },
  { id: 'a3', title: 'Beach Volleyball Social', sport: 'Volleyball', hostName: 'Kavya Sharma', location: 'Mission Bay Beach', startAt: '2026-09-05T17:00:00', capacity: 12, joined: 7, status: 'open', featured: true },
  { id: 'a4', title: 'Friday Night Futsal', sport: 'Futsal', hostName: 'Ben Ropata', location: 'Eden Park Futsal Courts', startAt: '2026-09-04T19:00:00', capacity: 10, joined: 10, status: 'full', featured: false },
  { id: 'a5', title: 'Saturday Morning 5K', sport: 'Running Club', hostName: 'Aroha Ngata', location: 'Western Springs Lakeside', startAt: '2026-09-06T07:30:00', capacity: 30, joined: 18, status: 'open', featured: false },
  { id: 'a6', title: 'Padel Round Robin', sport: 'Padel', hostName: 'Grace Kim', location: 'Auckland Padel Club', startAt: '2026-09-01T16:00:00', capacity: 8, joined: 2, status: 'open', featured: false },
  { id: 'a7', title: 'Midweek Basketball Run', sport: 'Basketball', hostName: 'Jack Thompson', location: 'Grey Lynn Community Centre', startAt: '2026-08-27T19:00:00', capacity: 10, joined: 4, status: 'cancelled', featured: false },
  { id: 'a8', title: 'Sunrise Tennis Hit-out', sport: 'Tennis', hostName: 'Emily Wilson', location: 'Stanley St Tennis Courts', startAt: '2026-08-25T06:30:00', capacity: 4, joined: 4, status: 'completed', featured: false },
];

export const REPORTS: Report[] = [
  { id: 'r1', type: 'user', targetLabel: 'Jack Thompson', reason: 'Harassment', details: 'Reported for repeated unwanted messages after being asked to stop, following the Midweek Basketball Run activity chat.', reporterName: 'Grace Kim', createdAt: '2026-08-27T20:14:00', status: 'pending' },
  { id: 'r2', type: 'activity', targetLabel: 'Midweek Basketball Run', reason: 'No-show host', details: 'Host cancelled 10 minutes before start time with no notice; third time this month.', reporterName: 'Ben Ropata', createdAt: '2026-08-27T19:20:00', status: 'pending' },
  { id: 'r3', type: 'user', targetLabel: 'Sione Taufa', reason: 'Inappropriate profile photo', details: 'Profile photo flagged by three separate users as inappropriate.', reporterName: 'Priya Nair', createdAt: '2026-08-24T11:02:00', status: 'reviewed' },
  { id: 'r4', type: 'message', targetLabel: 'Chat in "Friday Night Futsal"', reason: 'Spam / advertising', details: 'User repeatedly posted links to an unrelated business in the activity group chat.', reporterName: 'Ben Ropata', createdAt: '2026-08-22T21:45:00', status: 'actioned' },
  { id: 'r5', type: 'user', targetLabel: 'Jack Thompson', reason: 'Fake profile', details: 'Reporter believes photos are not of the account holder; requested ID verification.', reporterName: 'Emily Wilson', createdAt: '2026-08-18T09:30:00', status: 'actioned' },
  { id: 'r6', type: 'activity', targetLabel: 'Beach Volleyball Social', reason: 'Unsafe conditions', details: 'Reporter flagged the listed court as closed for maintenance; listing not updated.', reporterName: 'Kavya Sharma', createdAt: '2026-08-15T14:10:00', status: 'dismissed' },
];

export const BROADCASTS: Broadcast[] = [
  { id: 'b1', audience: 'All members', message: 'MatchUp v1.2 is live — new calendar sync for your joined activities. Update the app to try it out.', sentAt: '2026-08-24T10:00:00', recipients: 4213, status: 'sent' },
  { id: 'b2', audience: 'Basketball players', message: 'Vote now for your Ballers of the Month before Sunday\'s pickup game!', sentAt: '2026-08-20T15:30:00', recipients: 812, status: 'sent' },
  { id: 'b3', audience: 'Auckland CBD', message: 'Heads up — Stanley St Tennis Courts are closed for resurfacing until Sept 3.', sentAt: '2026-08-18T08:00:00', recipients: 356, status: 'sent' },
  { id: 'b4', audience: 'All members', message: 'Spring sign-up drive: refer a friend and you both get an early badge.', sentAt: '2026-09-01T09:00:00', recipients: 0, status: 'scheduled' },
];

export const DASHBOARD_STATS = {
  totalMembers: MEMBERS.length * 187, // scaled up so the tile reads like production data
  liveActivities: ACTIVITIES.filter((a) => a.status === 'open' || a.status === 'full').length * 34,
  matchesThisWeek: 1042,
  pendingReports: REPORTS.filter((r) => r.status === 'pending').length,
};
