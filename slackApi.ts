export type Attachment = {
  fallback?: string
  color?: string
  pretext?: string
  author_name?: string
  author_link?: string
  author_icon?: string
  title?: string
  title_link?: string
  text?: string
  fields?: AttachmentFieldsArrayItem[]
  image_url?: string
  thumb_url?: string
  footer?: string
  footer_icon?: string
  ts?: number
}
export type AttachmentFieldsArrayItem = {
  title?: string
  value?: string
  short?: boolean
}
export type HelloPayload = { type?: HelloPayloadType }
export const enum HelloPayloadType {
  HELLO = 'hello',
}
export type ConnectionErrorPayload = {
  type?: ConnectionErrorPayloadType
  error?: ConnectionErrorPayloadError
}
export const enum ConnectionErrorPayloadType {
  ERROR = 'error',
}
export type ConnectionErrorPayloadError = {
  code?: number
  msg?: string
}
export type AccountsChangedPayload = { type?: AccountsChangedPayloadType }
export const enum AccountsChangedPayloadType {
  ACCOUNTS_CHANGED = 'accounts_changed',
}
export type BotAddedPayload = {
  type?: BotAddedPayloadType
  bot?: BotAddedPayloadBot
}
export const enum BotAddedPayloadType {
  BOT_ADDED = 'bot_added',
}
export type BotAddedPayloadBot = {
  id?: string
  app_id?: string
  name?: string
  icons?: { [key: string]: string }
}
export type BotChangedPayload = {
  type?: BotChangedPayloadType
  bot?: BotChangedPayloadBot
}
export const enum BotChangedPayloadType {
  BOT_ADDED = 'bot_added',
}
export type BotChangedPayloadBot = {
  id?: string
  app_id?: string
  name?: string
  icons?: { [key: string]: string }
}
export type ChannelArchivePayload = {
  type?: ChannelArchivePayloadType
  channel?: string
  user?: string
}
export const enum ChannelArchivePayloadType {
  CHANNEL_ARCHIVE = 'channel_archive',
}
export type ChannelCreatedPayload = {
  type?: ChannelCreatedPayloadType
  channel?: ChannelCreatedPayloadChannel
}
export const enum ChannelCreatedPayloadType {
  CHANNEL_CREATED = 'channel_created',
}
export type ChannelCreatedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ChannelDeletedPayload = {
  type?: ChannelDeletedPayloadType
  channel?: string
}
export const enum ChannelDeletedPayloadType {
  CHANNEL_DELETED = 'channel_deleted',
}
export type ChannelHistoryChangedPayload = {
  type?: ChannelHistoryChangedPayloadType
  latest?: string
  ts?: string
  event_ts?: string
}
export const enum ChannelHistoryChangedPayloadType {
  CHANNEL_HISTORY_CHANGED = 'channel_history_changed',
}
export type ChannelJoinedPayload = {
  type?: ChannelJoinedPayloadType
  channel?: ChannelJoinedPayloadChannel
}
export const enum ChannelJoinedPayloadType {
  CHANNEL_JOINED = 'channel_joined',
}
export type ChannelJoinedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ChannelLeftPayload = {
  type?: ChannelLeftPayloadType
  channel?: string
}
export const enum ChannelLeftPayloadType {
  CHANNEL_LEFT = 'channel_left',
}
export type ChannelMarkedPayload = {
  type?: ChannelMarkedPayloadType
  channel?: string
  ts?: string
}
export const enum ChannelMarkedPayloadType {
  CHANNEL_MARKED = 'channel_marked',
}
export type ChannelRenamePayload = {
  type?: ChannelRenamePayloadType
  channel?: ChannelRenamePayloadChannel
}
export const enum ChannelRenamePayloadType {
  CHANNEL_RENAME = 'channel_rename',
}
export type ChannelRenamePayloadChannel = {
  id?: string
  name?: string
  created?: number
}
export type ChannelUnarchivePayload = {
  type?: ChannelUnarchivePayloadType
  channel?: string
  user?: string
}
export const enum ChannelUnarchivePayloadType {
  CHANNEL_UNARCHIVE = 'channel_unarchive',
}
export type CommandsChangedPayload = {
  type?: CommandsChangedPayloadType
  event_ts?: string
}
export const enum CommandsChangedPayloadType {
  COMMANDS_CHANGED = 'commands_changed',
}
export type DndUpdatedPayload = {
  type?: DndUpdatedPayloadType
  user?: string
  dnd_status?: DndUpdatedPayloadDndStatus
}
export const enum DndUpdatedPayloadType {
  DND_UPDATED = 'dnd_updated',
}
export type DndUpdatedPayloadDndStatus = {
  dnd_enabled?: boolean
  next_dnd_start_ts?: number
  next_dnd_end_ts?: number
  snooze_enabled?: boolean
  snooze_endtime?: number
}
export type DndUpdatedUserPayload = {
  type?: DndUpdatedUserPayloadType
  user?: string
  dnd_status?: DndUpdatedUserPayloadDndStatus
}
export const enum DndUpdatedUserPayloadType {
  DND_UPDATED_USER = 'dnd_updated_user',
}
export type DndUpdatedUserPayloadDndStatus = {
  dnd_enabled?: boolean
  next_dnd_start_ts?: number
  next_dnd_end_ts?: number
}
export type EmailDomainChangedPayload = {
  type?: EmailDomainChangedPayloadType
  email_domain?: string
  event_ts?: string
}
export const enum EmailDomainChangedPayloadType {
  EMAIL_DOMAIN_CHANGED = 'email_domain_changed',
}
export type EmojiRemovedPayload = {
  type?: EmojiRemovedPayloadType
  subtype?: EmojiRemovedPayloadSubtype
  names?: string[]
  event_ts?: string
}
export const enum EmojiRemovedPayloadType {
  EMOJI_CHANGED = 'emoji_changed',
}
export const enum EmojiRemovedPayloadSubtype {
  REMOVE = 'remove',
}
export type EmojiAddedPayload = {
  type?: EmojiAddedPayloadType
  subtype?: EmojiAddedPayloadSubtype
  name?: string
  value?: string
  event_ts?: string
}
export const enum EmojiAddedPayloadType {
  EMOJI_CHANGED = 'emoji_changed',
}
export const enum EmojiAddedPayloadSubtype {
  ADD = 'add',
}
export type FileChangePayload = {
  type?: FileChangePayloadType
  file_id?: string
  file?: FileChangePayloadFile
}
export const enum FileChangePayloadType {
  FILE_CHANGE = 'file_change',
}
export type FileChangePayloadFile = { id?: string }
export type FileCommentAddedPayload = {
  type?: FileCommentAddedPayloadType
  comment?: any
  file_id?: string
  file?: FileCommentAddedPayloadFile
}
export const enum FileCommentAddedPayloadType {
  FILE_COMMENT_ADDED = 'file_comment_added',
}
export type FileCommentAddedPayloadFile = { id?: string }
export type FileCommentDeletedPayload = {
  type?: FileCommentDeletedPayloadType
  comment?: string
  file_id?: string
  file?: FileCommentDeletedPayloadFile
}
export const enum FileCommentDeletedPayloadType {
  FILE_COMMENT_DELETED = 'file_comment_deleted',
}
export type FileCommentDeletedPayloadFile = { id?: string }
export type FileCommentEditedPayload = {
  type?: FileCommentEditedPayloadType
  comment?: any
  file_id?: string
  file?: FileCommentEditedPayloadFile
}
export const enum FileCommentEditedPayloadType {
  FILE_COMMENT_EDITED = 'file_comment_edited',
}
export type FileCommentEditedPayloadFile = { id?: string }
export type FileCreatedPayload = {
  type?: FileCreatedPayloadType
  file_id?: string
  file?: FileCreatedPayloadFile
}
export const enum FileCreatedPayloadType {
  FILE_CREATED = 'file_created',
}
export type FileCreatedPayloadFile = { id?: string }
export type FileDeletedPayload = {
  type?: FileDeletedPayloadType
  file_id?: string
  event_ts?: string
}
export const enum FileDeletedPayloadType {
  FILE_DELETED = 'file_deleted',
}
export type FilePublicPayload = {
  type?: FilePublicPayloadType
  file_id?: string
  file?: FilePublicPayloadFile
}
export const enum FilePublicPayloadType {
  FILE_PUBLIC = 'file_public',
}
export type FilePublicPayloadFile = { id?: string }
export type FileSharedPayload = {
  type?: FileSharedPayloadType
  file_id?: string
  file?: FileSharedPayloadFile
}
export const enum FileSharedPayloadType {
  FILE_SHARED = 'file_shared',
}
export type FileSharedPayloadFile = { id?: string }
export type FileUnsharedPayload = {
  type?: FileUnsharedPayloadType
  file_id?: string
  file?: FileUnsharedPayloadFile
}
export const enum FileUnsharedPayloadType {
  FILE_UNSHARED = 'file_unshared',
}
export type FileUnsharedPayloadFile = { id?: string }
export type GoodbyePayload = { type?: GoodbyePayloadType }
export const enum GoodbyePayloadType {
  GOODBYE = 'goodbye',
}
export type GroupArchivePayload = {
  type?: GroupArchivePayloadType
  channel?: string
}
export const enum GroupArchivePayloadType {
  GROUP_ARCHIVE = 'group_archive',
}
export type GroupClosePayload = {
  type?: GroupClosePayloadType
  user?: string
  channel?: string
}
export const enum GroupClosePayloadType {
  GROUP_CLOSE = 'group_close',
}
export type GroupHistoryChangedPayload = {
  type?: GroupHistoryChangedPayloadType
  latest?: string
  ts?: string
  event_ts?: string
}
export const enum GroupHistoryChangedPayloadType {
  GROUP_HISTORY_CHANGED = 'group_history_changed',
}
export type GroupJoinedPayload = {
  type?: GroupJoinedPayloadType
  channel?: GroupJoinedPayloadChannel
}
export const enum GroupJoinedPayloadType {
  GROUP_JOINED = 'group_joined',
}
export type GroupJoinedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type GroupLeftPayload = {
  type?: GroupLeftPayloadType
  channel?: string
}
export const enum GroupLeftPayloadType {
  GROUP_LEFT = 'group_left',
}
export type GroupMarkedPayload = {
  type?: GroupMarkedPayloadType
  channel?: string
  ts?: string
}
export const enum GroupMarkedPayloadType {
  GROUP_MARKED = 'group_marked',
}
export type GroupOpenPayload = {
  type?: GroupOpenPayloadType
  user?: string
  channel?: string
}
export const enum GroupOpenPayloadType {
  GROUP_OPEN = 'group_open',
}
export type GroupRenamePayload = {
  type?: GroupRenamePayloadType
  channel?: GroupRenamePayloadChannel
}
export const enum GroupRenamePayloadType {
  GROUP_RENAME = 'group_rename',
}
export type GroupRenamePayloadChannel = {
  id?: string
  name?: string
  created?: number
}
export type GroupUnarchivePayload = {
  type?: GroupUnarchivePayloadType
  channel?: string
  user?: string
}
export const enum GroupUnarchivePayloadType {
  GROUP_UNARCHIVE = 'group_unarchive',
}
export type ImClosePayload = {
  type?: ImClosePayloadType
  channel?: string
  user?: string
}
export const enum ImClosePayloadType {
  IM_CLOSE = 'im_close',
}
export type ImCreatedPayload = {
  type?: ImCreatedPayloadType
  channel?: ImCreatedPayloadChannel
  user?: string
}
export const enum ImCreatedPayloadType {
  IM_CREATED = 'im_created',
}
export type ImCreatedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ImMarkedPayload = {
  type?: ImMarkedPayloadType
  channel?: string
  ts?: string
}
export const enum ImMarkedPayloadType {
  IM_MARKED = 'im_marked',
}
export type ImOpenPayload = {
  type?: ImOpenPayloadType
  channel?: string
  user?: string
}
export const enum ImOpenPayloadType {
  IM_OPEN = 'im_open',
}
export type ManualPresenceChangePayload = {
  type?: ManualPresenceChangePayloadType
  presence?: string
}
export const enum ManualPresenceChangePayloadType {
  MANUAL_PRESENCE_CHANGE = 'manual_presence_change',
}
export type MemberJoinedChannelPayload = {
  type?: MemberJoinedChannelPayloadType
  user?: string
  channel?: string
  channel_type?: MemberJoinedChannelPayloadChannelType
  team?: string
  inviter?: string
}
export const enum MemberJoinedChannelPayloadType {
  MEMBER_JOINED_CHANNEL = 'member_joined_channel',
}
export const enum MemberJoinedChannelPayloadChannelType {
  C = 'C',
  G = 'G',
}
export type MemberLeftChannelPayload = {
  type?: MemberLeftChannelPayloadType
  user?: string
  channel?: string
  channel_type?: MemberLeftChannelPayloadChannelType
  team?: string
}
export const enum MemberLeftChannelPayloadType {
  MEMBER_LEFT_CHANNEL = 'member_left_channel',
}
export const enum MemberLeftChannelPayloadChannelType {
  C = 'C',
  G = 'G',
}
export type MessagePayload = {
  type?: MessagePayloadType
  user?: string
  channel?: string
  text?: string
  ts?: string
  attachments?: Attachment[]
  edited?: MessagePayloadEdited
}
export const enum MessagePayloadType {
  MESSAGE = 'message',
}
export type MessagePayloadEdited = {
  user?: string
  ts?: string
}
export type OutgoingMessagePayload = {
  id?: number
  type?: OutgoingMessagePayloadType
  channel?: string
  text?: string
}
export const enum OutgoingMessagePayloadType {
  MESSAGE = 'message',
}
export function isAttachment(input: any): input is Attachment {
  return false // TODO
}
export function isAttachmentFieldsArrayItem(input: any): input is AttachmentFieldsArrayItem {
  return false // TODO
}
export function isHelloPayload(input: any): input is HelloPayload {
  return false // TODO
}
export function isHelloPayloadType(input: any): input is HelloPayloadType {
  return false // TODO
}
export function isConnectionErrorPayload(input: any): input is ConnectionErrorPayload {
  return false // TODO
}
export function isConnectionErrorPayloadType(input: any): input is ConnectionErrorPayloadType {
  return false // TODO
}
export function isConnectionErrorPayloadError(input: any): input is ConnectionErrorPayloadError {
  return false // TODO
}
export function isAccountsChangedPayload(input: any): input is AccountsChangedPayload {
  return false // TODO
}
export function isAccountsChangedPayloadType(input: any): input is AccountsChangedPayloadType {
  return false // TODO
}
export function isBotAddedPayload(input: any): input is BotAddedPayload {
  return false // TODO
}
export function isBotAddedPayloadType(input: any): input is BotAddedPayloadType {
  return false // TODO
}
export function isBotAddedPayloadBot(input: any): input is BotAddedPayloadBot {
  return false // TODO
}
export function isBotChangedPayload(input: any): input is BotChangedPayload {
  return false // TODO
}
export function isBotChangedPayloadType(input: any): input is BotChangedPayloadType {
  return false // TODO
}
export function isBotChangedPayloadBot(input: any): input is BotChangedPayloadBot {
  return false // TODO
}
export function isChannelArchivePayload(input: any): input is ChannelArchivePayload {
  return false // TODO
}
export function isChannelArchivePayloadType(input: any): input is ChannelArchivePayloadType {
  return false // TODO
}
export function isChannelCreatedPayload(input: any): input is ChannelCreatedPayload {
  return false // TODO
}
export function isChannelCreatedPayloadType(input: any): input is ChannelCreatedPayloadType {
  return false // TODO
}
export function isChannelCreatedPayloadChannel(input: any): input is ChannelCreatedPayloadChannel {
  return false // TODO
}
export function isChannelDeletedPayload(input: any): input is ChannelDeletedPayload {
  return false // TODO
}
export function isChannelDeletedPayloadType(input: any): input is ChannelDeletedPayloadType {
  return false // TODO
}
export function isChannelHistoryChangedPayload(input: any): input is ChannelHistoryChangedPayload {
  return false // TODO
}
export function isChannelHistoryChangedPayloadType(input: any): input is ChannelHistoryChangedPayloadType {
  return false // TODO
}
export function isChannelJoinedPayload(input: any): input is ChannelJoinedPayload {
  return false // TODO
}
export function isChannelJoinedPayloadType(input: any): input is ChannelJoinedPayloadType {
  return false // TODO
}
export function isChannelJoinedPayloadChannel(input: any): input is ChannelJoinedPayloadChannel {
  return false // TODO
}
export function isChannelLeftPayload(input: any): input is ChannelLeftPayload {
  return false // TODO
}
export function isChannelLeftPayloadType(input: any): input is ChannelLeftPayloadType {
  return false // TODO
}
export function isChannelMarkedPayload(input: any): input is ChannelMarkedPayload {
  return false // TODO
}
export function isChannelMarkedPayloadType(input: any): input is ChannelMarkedPayloadType {
  return false // TODO
}
export function isChannelRenamePayload(input: any): input is ChannelRenamePayload {
  return false // TODO
}
export function isChannelRenamePayloadType(input: any): input is ChannelRenamePayloadType {
  return false // TODO
}
export function isChannelRenamePayloadChannel(input: any): input is ChannelRenamePayloadChannel {
  return false // TODO
}
export function isChannelUnarchivePayload(input: any): input is ChannelUnarchivePayload {
  return false // TODO
}
export function isChannelUnarchivePayloadType(input: any): input is ChannelUnarchivePayloadType {
  return false // TODO
}
export function isCommandsChangedPayload(input: any): input is CommandsChangedPayload {
  return false // TODO
}
export function isCommandsChangedPayloadType(input: any): input is CommandsChangedPayloadType {
  return false // TODO
}
export function isDndUpdatedPayload(input: any): input is DndUpdatedPayload {
  return false // TODO
}
export function isDndUpdatedPayloadType(input: any): input is DndUpdatedPayloadType {
  return false // TODO
}
export function isDndUpdatedPayloadDndStatus(input: any): input is DndUpdatedPayloadDndStatus {
  return false // TODO
}
export function isDndUpdatedUserPayload(input: any): input is DndUpdatedUserPayload {
  return false // TODO
}
export function isDndUpdatedUserPayloadType(input: any): input is DndUpdatedUserPayloadType {
  return false // TODO
}
export function isDndUpdatedUserPayloadDndStatus(input: any): input is DndUpdatedUserPayloadDndStatus {
  return false // TODO
}
export function isEmailDomainChangedPayload(input: any): input is EmailDomainChangedPayload {
  return false // TODO
}
export function isEmailDomainChangedPayloadType(input: any): input is EmailDomainChangedPayloadType {
  return false // TODO
}
export function isEmojiRemovedPayload(input: any): input is EmojiRemovedPayload {
  return false // TODO
}
export function isEmojiRemovedPayloadType(input: any): input is EmojiRemovedPayloadType {
  return false // TODO
}
export function isEmojiRemovedPayloadSubtype(input: any): input is EmojiRemovedPayloadSubtype {
  return false // TODO
}
export function isEmojiAddedPayload(input: any): input is EmojiAddedPayload {
  return false // TODO
}
export function isEmojiAddedPayloadType(input: any): input is EmojiAddedPayloadType {
  return false // TODO
}
export function isEmojiAddedPayloadSubtype(input: any): input is EmojiAddedPayloadSubtype {
  return false // TODO
}
export function isFileChangePayload(input: any): input is FileChangePayload {
  return false // TODO
}
export function isFileChangePayloadType(input: any): input is FileChangePayloadType {
  return false // TODO
}
export function isFileChangePayloadFile(input: any): input is FileChangePayloadFile {
  return false // TODO
}
export function isFileCommentAddedPayload(input: any): input is FileCommentAddedPayload {
  return false // TODO
}
export function isFileCommentAddedPayloadType(input: any): input is FileCommentAddedPayloadType {
  return false // TODO
}
export function isFileCommentAddedPayloadFile(input: any): input is FileCommentAddedPayloadFile {
  return false // TODO
}
export function isFileCommentDeletedPayload(input: any): input is FileCommentDeletedPayload {
  return false // TODO
}
export function isFileCommentDeletedPayloadType(input: any): input is FileCommentDeletedPayloadType {
  return false // TODO
}
export function isFileCommentDeletedPayloadFile(input: any): input is FileCommentDeletedPayloadFile {
  return false // TODO
}
export function isFileCommentEditedPayload(input: any): input is FileCommentEditedPayload {
  return false // TODO
}
export function isFileCommentEditedPayloadType(input: any): input is FileCommentEditedPayloadType {
  return false // TODO
}
export function isFileCommentEditedPayloadFile(input: any): input is FileCommentEditedPayloadFile {
  return false // TODO
}
export function isFileCreatedPayload(input: any): input is FileCreatedPayload {
  return false // TODO
}
export function isFileCreatedPayloadType(input: any): input is FileCreatedPayloadType {
  return false // TODO
}
export function isFileCreatedPayloadFile(input: any): input is FileCreatedPayloadFile {
  return false // TODO
}
export function isFileDeletedPayload(input: any): input is FileDeletedPayload {
  return false // TODO
}
export function isFileDeletedPayloadType(input: any): input is FileDeletedPayloadType {
  return false // TODO
}
export function isFilePublicPayload(input: any): input is FilePublicPayload {
  return false // TODO
}
export function isFilePublicPayloadType(input: any): input is FilePublicPayloadType {
  return false // TODO
}
export function isFilePublicPayloadFile(input: any): input is FilePublicPayloadFile {
  return false // TODO
}
export function isFileSharedPayload(input: any): input is FileSharedPayload {
  return false // TODO
}
export function isFileSharedPayloadType(input: any): input is FileSharedPayloadType {
  return false // TODO
}
export function isFileSharedPayloadFile(input: any): input is FileSharedPayloadFile {
  return false // TODO
}
export function isFileUnsharedPayload(input: any): input is FileUnsharedPayload {
  return false // TODO
}
export function isFileUnsharedPayloadType(input: any): input is FileUnsharedPayloadType {
  return false // TODO
}
export function isFileUnsharedPayloadFile(input: any): input is FileUnsharedPayloadFile {
  return false // TODO
}
export function isGoodbyePayload(input: any): input is GoodbyePayload {
  return false // TODO
}
export function isGoodbyePayloadType(input: any): input is GoodbyePayloadType {
  return false // TODO
}
export function isGroupArchivePayload(input: any): input is GroupArchivePayload {
  return false // TODO
}
export function isGroupArchivePayloadType(input: any): input is GroupArchivePayloadType {
  return false // TODO
}
export function isGroupClosePayload(input: any): input is GroupClosePayload {
  return false // TODO
}
export function isGroupClosePayloadType(input: any): input is GroupClosePayloadType {
  return false // TODO
}
export function isGroupHistoryChangedPayload(input: any): input is GroupHistoryChangedPayload {
  return false // TODO
}
export function isGroupHistoryChangedPayloadType(input: any): input is GroupHistoryChangedPayloadType {
  return false // TODO
}
export function isGroupJoinedPayload(input: any): input is GroupJoinedPayload {
  return false // TODO
}
export function isGroupJoinedPayloadType(input: any): input is GroupJoinedPayloadType {
  return false // TODO
}
export function isGroupJoinedPayloadChannel(input: any): input is GroupJoinedPayloadChannel {
  return false // TODO
}
export function isGroupLeftPayload(input: any): input is GroupLeftPayload {
  return false // TODO
}
export function isGroupLeftPayloadType(input: any): input is GroupLeftPayloadType {
  return false // TODO
}
export function isGroupMarkedPayload(input: any): input is GroupMarkedPayload {
  return false // TODO
}
export function isGroupMarkedPayloadType(input: any): input is GroupMarkedPayloadType {
  return false // TODO
}
export function isGroupOpenPayload(input: any): input is GroupOpenPayload {
  return false // TODO
}
export function isGroupOpenPayloadType(input: any): input is GroupOpenPayloadType {
  return false // TODO
}
export function isGroupRenamePayload(input: any): input is GroupRenamePayload {
  return false // TODO
}
export function isGroupRenamePayloadType(input: any): input is GroupRenamePayloadType {
  return false // TODO
}
export function isGroupRenamePayloadChannel(input: any): input is GroupRenamePayloadChannel {
  return false // TODO
}
export function isGroupUnarchivePayload(input: any): input is GroupUnarchivePayload {
  return false // TODO
}
export function isGroupUnarchivePayloadType(input: any): input is GroupUnarchivePayloadType {
  return false // TODO
}
export function isImClosePayload(input: any): input is ImClosePayload {
  return false // TODO
}
export function isImClosePayloadType(input: any): input is ImClosePayloadType {
  return false // TODO
}
export function isImCreatedPayload(input: any): input is ImCreatedPayload {
  return false // TODO
}
export function isImCreatedPayloadType(input: any): input is ImCreatedPayloadType {
  return false // TODO
}
export function isImCreatedPayloadChannel(input: any): input is ImCreatedPayloadChannel {
  return false // TODO
}
export function isImMarkedPayload(input: any): input is ImMarkedPayload {
  return false // TODO
}
export function isImMarkedPayloadType(input: any): input is ImMarkedPayloadType {
  return false // TODO
}
export function isImOpenPayload(input: any): input is ImOpenPayload {
  return false // TODO
}
export function isImOpenPayloadType(input: any): input is ImOpenPayloadType {
  return false // TODO
}
export function isManualPresenceChangePayload(input: any): input is ManualPresenceChangePayload {
  return false // TODO
}
export function isManualPresenceChangePayloadType(input: any): input is ManualPresenceChangePayloadType {
  return false // TODO
}
export function isMemberJoinedChannelPayload(input: any): input is MemberJoinedChannelPayload {
  return false // TODO
}
export function isMemberJoinedChannelPayloadType(input: any): input is MemberJoinedChannelPayloadType {
  return false // TODO
}
export function isMemberJoinedChannelPayloadChannelType(input: any): input is MemberJoinedChannelPayloadChannelType {
  return false // TODO
}
export function isMemberLeftChannelPayload(input: any): input is MemberLeftChannelPayload {
  return false // TODO
}
export function isMemberLeftChannelPayloadType(input: any): input is MemberLeftChannelPayloadType {
  return false // TODO
}
export function isMemberLeftChannelPayloadChannelType(input: any): input is MemberLeftChannelPayloadChannelType {
  return false // TODO
}
export function isMessagePayload(input: any): input is MessagePayload {
  return false // TODO
}
export function isMessagePayloadType(input: any): input is MessagePayloadType {
  return false // TODO
}
export function isMessagePayloadEdited(input: any): input is MessagePayloadEdited {
  return false // TODO
}
export function isOutgoingMessagePayload(input: any): input is OutgoingMessagePayload {
  return false // TODO
}
export function isOutgoingMessagePayloadType(input: any): input is OutgoingMessagePayloadType {
  return false // TODO
}
