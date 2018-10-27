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
export type HelloPayload = { type?: 'hello' }
export type ConnectionErrorPayload = {
  type?: 'error'
  error?: ConnectionErrorPayloadError
}
export type ConnectionErrorPayloadError = {
  code?: number
  msg?: string
}
export type AccountsChangedPayload = { type?: 'accounts_changed' }
export type BotAddedPayload = {
  type?: 'bot_added'
  bot?: BotAddedPayloadBot
}
export type BotAddedPayloadBot = {
  id?: string
  app_id?: string
  name?: string
  icons?: { [key: string]: string }
}
export type BotChangedPayload = {
  type?: 'bot_added'
  bot?: BotChangedPayloadBot
}
export type BotChangedPayloadBot = {
  id?: string
  app_id?: string
  name?: string
  icons?: { [key: string]: string }
}
export type ChannelArchivePayload = {
  type?: 'channel_archive'
  channel?: string
  user?: string
}
export type ChannelCreatedPayload = {
  type?: 'channel_created'
  channel?: ChannelCreatedPayloadChannel
}
export type ChannelCreatedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ChannelDeletedPayload = {
  type?: 'channel_deleted'
  channel?: string
}
export type ChannelHistoryChangedPayload = {
  type?: 'channel_history_changed'
  latest?: string
  ts?: string
  event_ts?: string
}
export type ChannelJoinedPayload = {
  type?: 'channel_joined'
  channel?: ChannelJoinedPayloadChannel
}
export type ChannelJoinedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ChannelLeftPayload = {
  type?: 'channel_left'
  channel?: string
}
export type ChannelMarkedPayload = {
  type?: 'channel_marked'
  channel?: string
  ts?: string
}
export type ChannelRenamePayload = {
  type?: 'channel_rename'
  channel?: ChannelRenamePayloadChannel
}
export type ChannelRenamePayloadChannel = {
  id?: string
  name?: string
  created?: number
}
export type ChannelUnarchivePayload = {
  type?: 'channel_unarchive'
  channel?: string
  user?: string
}
export type CommandsChangedPayload = {
  type?: 'commands_changed'
  event_ts?: string
}
export type DndUpdatedPayload = {
  type?: 'dnd_updated'
  user?: string
  dnd_status?: DndUpdatedPayloadDndStatus
}
export type DndUpdatedPayloadDndStatus = {
  dnd_enabled?: boolean
  next_dnd_start_ts?: number
  next_dnd_end_ts?: number
  snooze_enabled?: boolean
  snooze_endtime?: number
}
export type DndUpdatedUserPayload = {
  type?: 'dnd_updated_user'
  user?: string
  dnd_status?: DndUpdatedUserPayloadDndStatus
}
export type DndUpdatedUserPayloadDndStatus = {
  dnd_enabled?: boolean
  next_dnd_start_ts?: number
  next_dnd_end_ts?: number
}
export type EmailDomainChangedPayload = {
  type?: 'email_domain_changed'
  email_domain?: string
  event_ts?: string
}
export type EmojiRemovedPayload = {
  type?: 'emoji_changed'
  subtype?: EmojiRemovedPayloadSubtype
  names?: string[]
  event_ts?: string
}
export const enum EmojiRemovedPayloadSubtype {
  REMOVE = 'remove',
}
export type EmojiAddedPayload = {
  type?: 'emoji_changed'
  subtype?: EmojiAddedPayloadSubtype
  name?: string
  value?: string
  event_ts?: string
}
export const enum EmojiAddedPayloadSubtype {
  ADD = 'add',
}
export type FileChangePayload = {
  type?: 'file_change'
  file_id?: string
  file?: FileChangePayloadFile
}
export type FileChangePayloadFile = { id?: string }
export type FileCommentAddedPayload = {
  type?: 'file_comment_added'
  comment?: any
  file_id?: string
  file?: FileCommentAddedPayloadFile
}
export type FileCommentAddedPayloadFile = { id?: string }
export type FileCommentDeletedPayload = {
  type?: 'file_comment_deleted'
  comment?: string
  file_id?: string
  file?: FileCommentDeletedPayloadFile
}
export type FileCommentDeletedPayloadFile = { id?: string }
export type FileCommentEditedPayload = {
  type?: 'file_comment_edited'
  comment?: any
  file_id?: string
  file?: FileCommentEditedPayloadFile
}
export type FileCommentEditedPayloadFile = { id?: string }
export type FileCreatedPayload = {
  type?: 'file_created'
  file_id?: string
  file?: FileCreatedPayloadFile
}
export type FileCreatedPayloadFile = { id?: string }
export type FileDeletedPayload = {
  type?: 'file_deleted'
  file_id?: string
  event_ts?: string
}
export type FilePublicPayload = {
  type?: 'file_public'
  file_id?: string
  file?: FilePublicPayloadFile
}
export type FilePublicPayloadFile = { id?: string }
export type FileSharedPayload = {
  type?: 'file_shared'
  file_id?: string
  file?: FileSharedPayloadFile
}
export type FileSharedPayloadFile = { id?: string }
export type FileUnsharedPayload = {
  type?: 'file_unshared'
  file_id?: string
  file?: FileUnsharedPayloadFile
}
export type FileUnsharedPayloadFile = { id?: string }
export type GoodbyePayload = { type?: 'goodbye' }
export type GroupArchivePayload = {
  type?: 'group_archive'
  channel?: string
}
export type GroupClosePayload = {
  type?: 'group_close'
  user?: string
  channel?: string
}
export type GroupHistoryChangedPayload = {
  type?: 'group_history_changed'
  latest?: string
  ts?: string
  event_ts?: string
}
export type GroupJoinedPayload = {
  type?: 'group_joined'
  channel?: GroupJoinedPayloadChannel
}
export type GroupJoinedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type GroupLeftPayload = {
  type?: 'group_left'
  channel?: string
}
export type GroupMarkedPayload = {
  type?: 'group_marked'
  channel?: string
  ts?: string
}
export type GroupOpenPayload = {
  type?: 'group_open'
  user?: string
  channel?: string
}
export type GroupRenamePayload = {
  type?: 'group_rename'
  channel?: GroupRenamePayloadChannel
}
export type GroupRenamePayloadChannel = {
  id?: string
  name?: string
  created?: number
}
export type GroupUnarchivePayload = {
  type?: 'group_unarchive'
  channel?: string
  user?: string
}
export type ImClosePayload = {
  type?: 'im_close'
  channel?: string
  user?: string
}
export type ImCreatedPayload = {
  type?: 'im_created'
  channel?: ImCreatedPayloadChannel
  user?: string
}
export type ImCreatedPayloadChannel = {
  id?: string
  name?: string
  created?: number
  creator?: string
}
export type ImMarkedPayload = {
  type?: 'im_marked'
  channel?: string
  ts?: string
}
export type ImOpenPayload = {
  type?: 'im_open'
  channel?: string
  user?: string
}
export type ManualPresenceChangePayload = {
  type?: 'manual_presence_change'
  presence?: string
}
export type MemberJoinedChannelPayload = {
  type?: 'member_joined_channel'
  user?: string
  channel?: string
  channel_type?: MemberJoinedChannelPayloadChannelType
  team?: string
  inviter?: string
}
export const enum MemberJoinedChannelPayloadChannelType {
  C = 'C',
  G = 'G',
}
export type MemberLeftChannelPayload = {
  type?: 'member_left_channel'
  user?: string
  channel?: string
  channel_type?: MemberLeftChannelPayloadChannelType
  team?: string
}
export const enum MemberLeftChannelPayloadChannelType {
  C = 'C',
  G = 'G',
}
export type MessagePayload = {
  type?: 'message'
  user?: string
  channel?: string
  text?: string
  ts?: string
  attachments?: Attachment[]
  edited?: MessagePayloadEdited
}
export type MessagePayloadEdited = {
  user?: string
  ts?: string
}
export type OutgoingMessagePayload = {
  id?: number
  type?: 'message'
  channel?: string
  text?: string
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
export function isConnectionErrorPayload(input: any): input is ConnectionErrorPayload {
  return false // TODO
}
export function isConnectionErrorPayloadError(input: any): input is ConnectionErrorPayloadError {
  return false // TODO
}
export function isAccountsChangedPayload(input: any): input is AccountsChangedPayload {
  return false // TODO
}
export function isBotAddedPayload(input: any): input is BotAddedPayload {
  return false // TODO
}
export function isBotAddedPayloadBot(input: any): input is BotAddedPayloadBot {
  return false // TODO
}
export function isBotChangedPayload(input: any): input is BotChangedPayload {
  return false // TODO
}
export function isBotChangedPayloadBot(input: any): input is BotChangedPayloadBot {
  return false // TODO
}
export function isChannelArchivePayload(input: any): input is ChannelArchivePayload {
  return false // TODO
}
export function isChannelCreatedPayload(input: any): input is ChannelCreatedPayload {
  return false // TODO
}
export function isChannelCreatedPayloadChannel(input: any): input is ChannelCreatedPayloadChannel {
  return false // TODO
}
export function isChannelDeletedPayload(input: any): input is ChannelDeletedPayload {
  return false // TODO
}
export function isChannelHistoryChangedPayload(input: any): input is ChannelHistoryChangedPayload {
  return false // TODO
}
export function isChannelJoinedPayload(input: any): input is ChannelJoinedPayload {
  return false // TODO
}
export function isChannelJoinedPayloadChannel(input: any): input is ChannelJoinedPayloadChannel {
  return false // TODO
}
export function isChannelLeftPayload(input: any): input is ChannelLeftPayload {
  return false // TODO
}
export function isChannelMarkedPayload(input: any): input is ChannelMarkedPayload {
  return false // TODO
}
export function isChannelRenamePayload(input: any): input is ChannelRenamePayload {
  return false // TODO
}
export function isChannelRenamePayloadChannel(input: any): input is ChannelRenamePayloadChannel {
  return false // TODO
}
export function isChannelUnarchivePayload(input: any): input is ChannelUnarchivePayload {
  return false // TODO
}
export function isCommandsChangedPayload(input: any): input is CommandsChangedPayload {
  return false // TODO
}
export function isDndUpdatedPayload(input: any): input is DndUpdatedPayload {
  return false // TODO
}
export function isDndUpdatedPayloadDndStatus(input: any): input is DndUpdatedPayloadDndStatus {
  return false // TODO
}
export function isDndUpdatedUserPayload(input: any): input is DndUpdatedUserPayload {
  return false // TODO
}
export function isDndUpdatedUserPayloadDndStatus(input: any): input is DndUpdatedUserPayloadDndStatus {
  return false // TODO
}
export function isEmailDomainChangedPayload(input: any): input is EmailDomainChangedPayload {
  return false // TODO
}
export function isEmojiRemovedPayload(input: any): input is EmojiRemovedPayload {
  return false // TODO
}
export function isEmojiRemovedPayloadSubtype(input: any): input is EmojiRemovedPayloadSubtype {
  return false // TODO
}
export function isEmojiAddedPayload(input: any): input is EmojiAddedPayload {
  return false // TODO
}
export function isEmojiAddedPayloadSubtype(input: any): input is EmojiAddedPayloadSubtype {
  return false // TODO
}
export function isFileChangePayload(input: any): input is FileChangePayload {
  return false // TODO
}
export function isFileChangePayloadFile(input: any): input is FileChangePayloadFile {
  return false // TODO
}
export function isFileCommentAddedPayload(input: any): input is FileCommentAddedPayload {
  return false // TODO
}
export function isFileCommentAddedPayloadFile(input: any): input is FileCommentAddedPayloadFile {
  return false // TODO
}
export function isFileCommentDeletedPayload(input: any): input is FileCommentDeletedPayload {
  return false // TODO
}
export function isFileCommentDeletedPayloadFile(input: any): input is FileCommentDeletedPayloadFile {
  return false // TODO
}
export function isFileCommentEditedPayload(input: any): input is FileCommentEditedPayload {
  return false // TODO
}
export function isFileCommentEditedPayloadFile(input: any): input is FileCommentEditedPayloadFile {
  return false // TODO
}
export function isFileCreatedPayload(input: any): input is FileCreatedPayload {
  return false // TODO
}
export function isFileCreatedPayloadFile(input: any): input is FileCreatedPayloadFile {
  return false // TODO
}
export function isFileDeletedPayload(input: any): input is FileDeletedPayload {
  return false // TODO
}
export function isFilePublicPayload(input: any): input is FilePublicPayload {
  return false // TODO
}
export function isFilePublicPayloadFile(input: any): input is FilePublicPayloadFile {
  return false // TODO
}
export function isFileSharedPayload(input: any): input is FileSharedPayload {
  return false // TODO
}
export function isFileSharedPayloadFile(input: any): input is FileSharedPayloadFile {
  return false // TODO
}
export function isFileUnsharedPayload(input: any): input is FileUnsharedPayload {
  return false // TODO
}
export function isFileUnsharedPayloadFile(input: any): input is FileUnsharedPayloadFile {
  return false // TODO
}
export function isGoodbyePayload(input: any): input is GoodbyePayload {
  return false // TODO
}
export function isGroupArchivePayload(input: any): input is GroupArchivePayload {
  return false // TODO
}
export function isGroupClosePayload(input: any): input is GroupClosePayload {
  return false // TODO
}
export function isGroupHistoryChangedPayload(input: any): input is GroupHistoryChangedPayload {
  return false // TODO
}
export function isGroupJoinedPayload(input: any): input is GroupJoinedPayload {
  return false // TODO
}
export function isGroupJoinedPayloadChannel(input: any): input is GroupJoinedPayloadChannel {
  return false // TODO
}
export function isGroupLeftPayload(input: any): input is GroupLeftPayload {
  return false // TODO
}
export function isGroupMarkedPayload(input: any): input is GroupMarkedPayload {
  return false // TODO
}
export function isGroupOpenPayload(input: any): input is GroupOpenPayload {
  return false // TODO
}
export function isGroupRenamePayload(input: any): input is GroupRenamePayload {
  return false // TODO
}
export function isGroupRenamePayloadChannel(input: any): input is GroupRenamePayloadChannel {
  return false // TODO
}
export function isGroupUnarchivePayload(input: any): input is GroupUnarchivePayload {
  return false // TODO
}
export function isImClosePayload(input: any): input is ImClosePayload {
  return false // TODO
}
export function isImCreatedPayload(input: any): input is ImCreatedPayload {
  return false // TODO
}
export function isImCreatedPayloadChannel(input: any): input is ImCreatedPayloadChannel {
  return false // TODO
}
export function isImMarkedPayload(input: any): input is ImMarkedPayload {
  return false // TODO
}
export function isImOpenPayload(input: any): input is ImOpenPayload {
  return false // TODO
}
export function isManualPresenceChangePayload(input: any): input is ManualPresenceChangePayload {
  return false // TODO
}
export function isMemberJoinedChannelPayload(input: any): input is MemberJoinedChannelPayload {
  return false // TODO
}
export function isMemberJoinedChannelPayloadChannelType(input: any): input is MemberJoinedChannelPayloadChannelType {
  return false // TODO
}
export function isMemberLeftChannelPayload(input: any): input is MemberLeftChannelPayload {
  return false // TODO
}
export function isMemberLeftChannelPayloadChannelType(input: any): input is MemberLeftChannelPayloadChannelType {
  return false // TODO
}
export function isMessagePayload(input: any): input is MessagePayload {
  return false // TODO
}
export function isMessagePayloadEdited(input: any): input is MessagePayloadEdited {
  return false // TODO
}
export function isOutgoingMessagePayload(input: any): input is OutgoingMessagePayload {
  return false // TODO
}
