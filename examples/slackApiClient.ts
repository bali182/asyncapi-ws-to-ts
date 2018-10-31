export type __SendMessageAdapter = {
  send(payload: any): void
}
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
  fields?: AttachmentFieldsItem[]
  image_url?: string
  thumb_url?: string
  footer?: string
  footer_icon?: string
  ts?: number
}
export type AttachmentFieldsItem = {
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
  subtype?: 'remove'
  names?: string[]
  event_ts?: string
}
export type EmojiAddedPayload = {
  type?: 'emoji_changed'
  subtype?: 'add'
  name?: string
  value?: string
  event_ts?: string
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
export function isHelloPayload(input: any): input is HelloPayload {
  return input instanceof Object && input.type === 'hello'
}
export function isConnectionErrorPayload(input: any): input is ConnectionErrorPayload {
  return input instanceof Object && input.type === 'error'
}
export function isAccountsChangedPayload(input: any): input is AccountsChangedPayload {
  return input instanceof Object && input.type === 'accounts_changed'
}
export function isBotAddedPayload(input: any): input is BotAddedPayload {
  return input instanceof Object && input.type === 'bot_added'
}
export function isBotChangedPayload(input: any): input is BotChangedPayload {
  return input instanceof Object && input.type === 'bot_added'
}
export function isChannelArchivePayload(input: any): input is ChannelArchivePayload {
  return input instanceof Object && input.type === 'channel_archive'
}
export function isChannelCreatedPayload(input: any): input is ChannelCreatedPayload {
  return input instanceof Object && input.type === 'channel_created'
}
export function isChannelDeletedPayload(input: any): input is ChannelDeletedPayload {
  return input instanceof Object && input.type === 'channel_deleted'
}
export function isChannelHistoryChangedPayload(input: any): input is ChannelHistoryChangedPayload {
  return input instanceof Object && input.type === 'channel_history_changed'
}
export function isChannelJoinedPayload(input: any): input is ChannelJoinedPayload {
  return input instanceof Object && input.type === 'channel_joined'
}
export function isChannelLeftPayload(input: any): input is ChannelLeftPayload {
  return input instanceof Object && input.type === 'channel_left'
}
export function isChannelMarkedPayload(input: any): input is ChannelMarkedPayload {
  return input instanceof Object && input.type === 'channel_marked'
}
export function isChannelRenamePayload(input: any): input is ChannelRenamePayload {
  return input instanceof Object && input.type === 'channel_rename'
}
export function isChannelUnarchivePayload(input: any): input is ChannelUnarchivePayload {
  return input instanceof Object && input.type === 'channel_unarchive'
}
export function isCommandsChangedPayload(input: any): input is CommandsChangedPayload {
  return input instanceof Object && input.type === 'commands_changed'
}
export function isDndUpdatedPayload(input: any): input is DndUpdatedPayload {
  return input instanceof Object && input.type === 'dnd_updated'
}
export function isDndUpdatedUserPayload(input: any): input is DndUpdatedUserPayload {
  return input instanceof Object && input.type === 'dnd_updated_user'
}
export function isEmailDomainChangedPayload(input: any): input is EmailDomainChangedPayload {
  return input instanceof Object && input.type === 'email_domain_changed'
}
export function isEmojiRemovedPayload(input: any): input is EmojiRemovedPayload {
  return input instanceof Object && input.type === 'emoji_changed' && input.subtype === 'remove'
}
export function isEmojiAddedPayload(input: any): input is EmojiAddedPayload {
  return input instanceof Object && input.type === 'emoji_changed' && input.subtype === 'add'
}
export function isFileChangePayload(input: any): input is FileChangePayload {
  return input instanceof Object && input.type === 'file_change'
}
export function isFileCommentAddedPayload(input: any): input is FileCommentAddedPayload {
  return input instanceof Object && input.type === 'file_comment_added'
}
export function isFileCommentDeletedPayload(input: any): input is FileCommentDeletedPayload {
  return input instanceof Object && input.type === 'file_comment_deleted'
}
export function isFileCommentEditedPayload(input: any): input is FileCommentEditedPayload {
  return input instanceof Object && input.type === 'file_comment_edited'
}
export function isFileCreatedPayload(input: any): input is FileCreatedPayload {
  return input instanceof Object && input.type === 'file_created'
}
export function isFileDeletedPayload(input: any): input is FileDeletedPayload {
  return input instanceof Object && input.type === 'file_deleted'
}
export function isFilePublicPayload(input: any): input is FilePublicPayload {
  return input instanceof Object && input.type === 'file_public'
}
export function isFileSharedPayload(input: any): input is FileSharedPayload {
  return input instanceof Object && input.type === 'file_shared'
}
export function isFileUnsharedPayload(input: any): input is FileUnsharedPayload {
  return input instanceof Object && input.type === 'file_unshared'
}
export function isGoodbyePayload(input: any): input is GoodbyePayload {
  return input instanceof Object && input.type === 'goodbye'
}
export function isGroupArchivePayload(input: any): input is GroupArchivePayload {
  return input instanceof Object && input.type === 'group_archive'
}
export function isGroupClosePayload(input: any): input is GroupClosePayload {
  return input instanceof Object && input.type === 'group_close'
}
export function isGroupHistoryChangedPayload(input: any): input is GroupHistoryChangedPayload {
  return input instanceof Object && input.type === 'group_history_changed'
}
export function isGroupJoinedPayload(input: any): input is GroupJoinedPayload {
  return input instanceof Object && input.type === 'group_joined'
}
export function isGroupLeftPayload(input: any): input is GroupLeftPayload {
  return input instanceof Object && input.type === 'group_left'
}
export function isGroupMarkedPayload(input: any): input is GroupMarkedPayload {
  return input instanceof Object && input.type === 'group_marked'
}
export function isGroupOpenPayload(input: any): input is GroupOpenPayload {
  return input instanceof Object && input.type === 'group_open'
}
export function isGroupRenamePayload(input: any): input is GroupRenamePayload {
  return input instanceof Object && input.type === 'group_rename'
}
export function isGroupUnarchivePayload(input: any): input is GroupUnarchivePayload {
  return input instanceof Object && input.type === 'group_unarchive'
}
export function isImClosePayload(input: any): input is ImClosePayload {
  return input instanceof Object && input.type === 'im_close'
}
export function isImCreatedPayload(input: any): input is ImCreatedPayload {
  return input instanceof Object && input.type === 'im_created'
}
export function isImMarkedPayload(input: any): input is ImMarkedPayload {
  return input instanceof Object && input.type === 'im_marked'
}
export function isImOpenPayload(input: any): input is ImOpenPayload {
  return input instanceof Object && input.type === 'im_open'
}
export function isManualPresenceChangePayload(input: any): input is ManualPresenceChangePayload {
  return input instanceof Object && input.type === 'manual_presence_change'
}
export function isMemberJoinedChannelPayload(input: any): input is MemberJoinedChannelPayload {
  return input instanceof Object && input.type === 'member_joined_channel'
}
export function isMessagePayload(input: any): input is MessagePayload {
  return input instanceof Object && input.type === 'message'
}
export function isOutgoingMessagePayload(input: any): input is OutgoingMessagePayload {
  return input instanceof Object && input.type === 'message'
}
export type SlackApiClientListener = {
  hello(payload: HelloPayload): void
  connectionError(payload: ConnectionErrorPayload): void
  accountsChanged(payload: AccountsChangedPayload): void
  botAdded(payload: BotAddedPayload): void
  botChanged(payload: BotChangedPayload): void
  channelArchive(payload: ChannelArchivePayload): void
  channelCreated(payload: ChannelCreatedPayload): void
  channelDeleted(payload: ChannelDeletedPayload): void
  channelHistoryChanged(payload: ChannelHistoryChangedPayload): void
  channelJoined(payload: ChannelJoinedPayload): void
  channelLeft(payload: ChannelLeftPayload): void
  channelMarked(payload: ChannelMarkedPayload): void
  channelRename(payload: ChannelRenamePayload): void
  channelUnarchive(payload: ChannelUnarchivePayload): void
  commandsChanged(payload: CommandsChangedPayload): void
  dndUpdated(payload: DndUpdatedPayload): void
  dndUpdatedUser(payload: DndUpdatedUserPayload): void
  emailDomainChanged(payload: EmailDomainChangedPayload): void
  emojiRemoved(payload: EmojiRemovedPayload): void
  emojiAdded(payload: EmojiAddedPayload): void
  fileChange(payload: FileChangePayload): void
  fileCommentAdded(payload: FileCommentAddedPayload): void
  fileCommentDeleted(payload: FileCommentDeletedPayload): void
  fileCommentEdited(payload: FileCommentEditedPayload): void
  fileCreated(payload: FileCreatedPayload): void
  fileDeleted(payload: FileDeletedPayload): void
  filePublic(payload: FilePublicPayload): void
  fileShared(payload: FileSharedPayload): void
  fileUnshared(payload: FileUnsharedPayload): void
  goodbye(payload: GoodbyePayload): void
  groupArchive(payload: GroupArchivePayload): void
  groupClose(payload: GroupClosePayload): void
  groupHistoryChanged(payload: GroupHistoryChangedPayload): void
  groupJoined(payload: GroupJoinedPayload): void
  groupLeft(payload: GroupLeftPayload): void
  groupMarked(payload: GroupMarkedPayload): void
  groupOpen(payload: GroupOpenPayload): void
  groupRename(payload: GroupRenamePayload): void
  groupUnarchive(payload: GroupUnarchivePayload): void
  imClose(payload: ImClosePayload): void
  imCreated(payload: ImCreatedPayload): void
  imMarked(payload: ImMarkedPayload): void
  imOpen(payload: ImOpenPayload): void
  manualPresenceChange(payload: ManualPresenceChangePayload): void
  memberJoinedChannel(payload: MemberJoinedChannelPayload): void
  message(payload: MessagePayload): void
}
export abstract class SlackApiClientListenerStub implements SlackApiClientListener {
  hello(payload: HelloPayload): void {
    /* implement me! */
  }
  connectionError(payload: ConnectionErrorPayload): void {
    /* implement me! */
  }
  accountsChanged(payload: AccountsChangedPayload): void {
    /* implement me! */
  }
  botAdded(payload: BotAddedPayload): void {
    /* implement me! */
  }
  botChanged(payload: BotChangedPayload): void {
    /* implement me! */
  }
  channelArchive(payload: ChannelArchivePayload): void {
    /* implement me! */
  }
  channelCreated(payload: ChannelCreatedPayload): void {
    /* implement me! */
  }
  channelDeleted(payload: ChannelDeletedPayload): void {
    /* implement me! */
  }
  channelHistoryChanged(payload: ChannelHistoryChangedPayload): void {
    /* implement me! */
  }
  channelJoined(payload: ChannelJoinedPayload): void {
    /* implement me! */
  }
  channelLeft(payload: ChannelLeftPayload): void {
    /* implement me! */
  }
  channelMarked(payload: ChannelMarkedPayload): void {
    /* implement me! */
  }
  channelRename(payload: ChannelRenamePayload): void {
    /* implement me! */
  }
  channelUnarchive(payload: ChannelUnarchivePayload): void {
    /* implement me! */
  }
  commandsChanged(payload: CommandsChangedPayload): void {
    /* implement me! */
  }
  dndUpdated(payload: DndUpdatedPayload): void {
    /* implement me! */
  }
  dndUpdatedUser(payload: DndUpdatedUserPayload): void {
    /* implement me! */
  }
  emailDomainChanged(payload: EmailDomainChangedPayload): void {
    /* implement me! */
  }
  emojiRemoved(payload: EmojiRemovedPayload): void {
    /* implement me! */
  }
  emojiAdded(payload: EmojiAddedPayload): void {
    /* implement me! */
  }
  fileChange(payload: FileChangePayload): void {
    /* implement me! */
  }
  fileCommentAdded(payload: FileCommentAddedPayload): void {
    /* implement me! */
  }
  fileCommentDeleted(payload: FileCommentDeletedPayload): void {
    /* implement me! */
  }
  fileCommentEdited(payload: FileCommentEditedPayload): void {
    /* implement me! */
  }
  fileCreated(payload: FileCreatedPayload): void {
    /* implement me! */
  }
  fileDeleted(payload: FileDeletedPayload): void {
    /* implement me! */
  }
  filePublic(payload: FilePublicPayload): void {
    /* implement me! */
  }
  fileShared(payload: FileSharedPayload): void {
    /* implement me! */
  }
  fileUnshared(payload: FileUnsharedPayload): void {
    /* implement me! */
  }
  goodbye(payload: GoodbyePayload): void {
    /* implement me! */
  }
  groupArchive(payload: GroupArchivePayload): void {
    /* implement me! */
  }
  groupClose(payload: GroupClosePayload): void {
    /* implement me! */
  }
  groupHistoryChanged(payload: GroupHistoryChangedPayload): void {
    /* implement me! */
  }
  groupJoined(payload: GroupJoinedPayload): void {
    /* implement me! */
  }
  groupLeft(payload: GroupLeftPayload): void {
    /* implement me! */
  }
  groupMarked(payload: GroupMarkedPayload): void {
    /* implement me! */
  }
  groupOpen(payload: GroupOpenPayload): void {
    /* implement me! */
  }
  groupRename(payload: GroupRenamePayload): void {
    /* implement me! */
  }
  groupUnarchive(payload: GroupUnarchivePayload): void {
    /* implement me! */
  }
  imClose(payload: ImClosePayload): void {
    /* implement me! */
  }
  imCreated(payload: ImCreatedPayload): void {
    /* implement me! */
  }
  imMarked(payload: ImMarkedPayload): void {
    /* implement me! */
  }
  imOpen(payload: ImOpenPayload): void {
    /* implement me! */
  }
  manualPresenceChange(payload: ManualPresenceChangePayload): void {
    /* implement me! */
  }
  memberJoinedChannel(payload: MemberJoinedChannelPayload): void {
    /* implement me! */
  }
  message(payload: MessagePayload): void {
    /* implement me! */
  }
}
export class SlackApiClientMessageReceiver {
  private readonly __listener: SlackApiClientListener
  constructor(listener: SlackApiClientListener) {
    this.__listener = listener
  }
  receive(input: any): void {
    if (isHelloPayload(input)) {
      return this.__listener.hello(input)
    } else if (isConnectionErrorPayload(input)) {
      return this.__listener.connectionError(input)
    } else if (isAccountsChangedPayload(input)) {
      return this.__listener.accountsChanged(input)
    } else if (isBotAddedPayload(input)) {
      return this.__listener.botAdded(input)
    } else if (isBotChangedPayload(input)) {
      return this.__listener.botChanged(input)
    } else if (isChannelArchivePayload(input)) {
      return this.__listener.channelArchive(input)
    } else if (isChannelCreatedPayload(input)) {
      return this.__listener.channelCreated(input)
    } else if (isChannelDeletedPayload(input)) {
      return this.__listener.channelDeleted(input)
    } else if (isChannelHistoryChangedPayload(input)) {
      return this.__listener.channelHistoryChanged(input)
    } else if (isChannelJoinedPayload(input)) {
      return this.__listener.channelJoined(input)
    } else if (isChannelLeftPayload(input)) {
      return this.__listener.channelLeft(input)
    } else if (isChannelMarkedPayload(input)) {
      return this.__listener.channelMarked(input)
    } else if (isChannelRenamePayload(input)) {
      return this.__listener.channelRename(input)
    } else if (isChannelUnarchivePayload(input)) {
      return this.__listener.channelUnarchive(input)
    } else if (isCommandsChangedPayload(input)) {
      return this.__listener.commandsChanged(input)
    } else if (isDndUpdatedPayload(input)) {
      return this.__listener.dndUpdated(input)
    } else if (isDndUpdatedUserPayload(input)) {
      return this.__listener.dndUpdatedUser(input)
    } else if (isEmailDomainChangedPayload(input)) {
      return this.__listener.emailDomainChanged(input)
    } else if (isEmojiRemovedPayload(input)) {
      return this.__listener.emojiRemoved(input)
    } else if (isEmojiAddedPayload(input)) {
      return this.__listener.emojiAdded(input)
    } else if (isFileChangePayload(input)) {
      return this.__listener.fileChange(input)
    } else if (isFileCommentAddedPayload(input)) {
      return this.__listener.fileCommentAdded(input)
    } else if (isFileCommentDeletedPayload(input)) {
      return this.__listener.fileCommentDeleted(input)
    } else if (isFileCommentEditedPayload(input)) {
      return this.__listener.fileCommentEdited(input)
    } else if (isFileCreatedPayload(input)) {
      return this.__listener.fileCreated(input)
    } else if (isFileDeletedPayload(input)) {
      return this.__listener.fileDeleted(input)
    } else if (isFilePublicPayload(input)) {
      return this.__listener.filePublic(input)
    } else if (isFileSharedPayload(input)) {
      return this.__listener.fileShared(input)
    } else if (isFileUnsharedPayload(input)) {
      return this.__listener.fileUnshared(input)
    } else if (isGoodbyePayload(input)) {
      return this.__listener.goodbye(input)
    } else if (isGroupArchivePayload(input)) {
      return this.__listener.groupArchive(input)
    } else if (isGroupClosePayload(input)) {
      return this.__listener.groupClose(input)
    } else if (isGroupHistoryChangedPayload(input)) {
      return this.__listener.groupHistoryChanged(input)
    } else if (isGroupJoinedPayload(input)) {
      return this.__listener.groupJoined(input)
    } else if (isGroupLeftPayload(input)) {
      return this.__listener.groupLeft(input)
    } else if (isGroupMarkedPayload(input)) {
      return this.__listener.groupMarked(input)
    } else if (isGroupOpenPayload(input)) {
      return this.__listener.groupOpen(input)
    } else if (isGroupRenamePayload(input)) {
      return this.__listener.groupRename(input)
    } else if (isGroupUnarchivePayload(input)) {
      return this.__listener.groupUnarchive(input)
    } else if (isImClosePayload(input)) {
      return this.__listener.imClose(input)
    } else if (isImCreatedPayload(input)) {
      return this.__listener.imCreated(input)
    } else if (isImMarkedPayload(input)) {
      return this.__listener.imMarked(input)
    } else if (isImOpenPayload(input)) {
      return this.__listener.imOpen(input)
    } else if (isManualPresenceChangePayload(input)) {
      return this.__listener.manualPresenceChange(input)
    } else if (isMemberJoinedChannelPayload(input)) {
      return this.__listener.memberJoinedChannel(input)
    } else if (isMessagePayload(input)) {
      return this.__listener.message(input)
    }
    throw new TypeError('Unrecognized payload value!')
  }
}
export class SlackApiClientMessageSender {
  private readonly __adapter: __SendMessageAdapter
  constructor(adapter: __SendMessageAdapter) {
    this.__adapter = adapter
  }
  outgoingMessage(payload: OutgoingMessagePayload): void {
    if (!isOutgoingMessagePayload(payload)) {
      throw new TypeError('Parameter payload should be of type OutgoingMessagePayload!')
    }
    this.__adapter.send(payload)
  }
}
