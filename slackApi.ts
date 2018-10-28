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
export function isMemberLeftChannelPayload(input: any): input is MemberLeftChannelPayload {
  return input instanceof Object && input.type === 'member_left_channel'
}
export function isMessagePayload(input: any): input is MessagePayload {
  return input instanceof Object && input.type === 'message'
}
export function isOutgoingMessagePayload(input: any): input is OutgoingMessagePayload {
  return input instanceof Object && input.type === 'message'
}
export type SlackApiListener = {
  onHello(payload: HelloPayload): void
  onConnectionError(payload: ConnectionErrorPayload): void
  onAccountsChanged(payload: AccountsChangedPayload): void
  onBotAdded(payload: BotAddedPayload): void
  onBotChanged(payload: BotChangedPayload): void
  onChannelArchive(payload: ChannelArchivePayload): void
  onChannelCreated(payload: ChannelCreatedPayload): void
  onChannelDeleted(payload: ChannelDeletedPayload): void
  onChannelHistoryChanged(payload: ChannelHistoryChangedPayload): void
  onChannelJoined(payload: ChannelJoinedPayload): void
  onChannelLeft(payload: ChannelLeftPayload): void
  onChannelMarked(payload: ChannelMarkedPayload): void
  onChannelRename(payload: ChannelRenamePayload): void
  onChannelUnarchive(payload: ChannelUnarchivePayload): void
  onCommandsChanged(payload: CommandsChangedPayload): void
  onDndUpdated(payload: DndUpdatedPayload): void
  onDndUpdatedUser(payload: DndUpdatedUserPayload): void
  onEmailDomainChanged(payload: EmailDomainChangedPayload): void
  onEmojiRemoved(payload: EmojiRemovedPayload): void
  onEmojiAdded(payload: EmojiAddedPayload): void
  onFileChange(payload: FileChangePayload): void
  onFileCommentAdded(payload: FileCommentAddedPayload): void
  onFileCommentDeleted(payload: FileCommentDeletedPayload): void
  onFileCommentEdited(payload: FileCommentEditedPayload): void
  onFileCreated(payload: FileCreatedPayload): void
  onFileDeleted(payload: FileDeletedPayload): void
  onFilePublic(payload: FilePublicPayload): void
  onFileShared(payload: FileSharedPayload): void
  onFileUnshared(payload: FileUnsharedPayload): void
  onGoodbye(payload: GoodbyePayload): void
  onGroupArchive(payload: GroupArchivePayload): void
  onGroupClose(payload: GroupClosePayload): void
  onGroupHistoryChanged(payload: GroupHistoryChangedPayload): void
  onGroupJoined(payload: GroupJoinedPayload): void
  onGroupLeft(payload: GroupLeftPayload): void
  onGroupMarked(payload: GroupMarkedPayload): void
  onGroupOpen(payload: GroupOpenPayload): void
  onGroupRename(payload: GroupRenamePayload): void
  onGroupUnarchive(payload: GroupUnarchivePayload): void
  onImClose(payload: ImClosePayload): void
  onImCreated(payload: ImCreatedPayload): void
  onImMarked(payload: ImMarkedPayload): void
  onImOpen(payload: ImOpenPayload): void
  onManualPresenceChange(payload: ManualPresenceChangePayload): void
  onMemberJoinedChannel(payload: MemberJoinedChannelPayload): void
  onMessage(payload: MessagePayload): void
}
export abstract class SlackApiListenerStub implements SlackApiListener {
  onHello(payload: HelloPayload): void {
    /* implement me! */
  }
  onConnectionError(payload: ConnectionErrorPayload): void {
    /* implement me! */
  }
  onAccountsChanged(payload: AccountsChangedPayload): void {
    /* implement me! */
  }
  onBotAdded(payload: BotAddedPayload): void {
    /* implement me! */
  }
  onBotChanged(payload: BotChangedPayload): void {
    /* implement me! */
  }
  onChannelArchive(payload: ChannelArchivePayload): void {
    /* implement me! */
  }
  onChannelCreated(payload: ChannelCreatedPayload): void {
    /* implement me! */
  }
  onChannelDeleted(payload: ChannelDeletedPayload): void {
    /* implement me! */
  }
  onChannelHistoryChanged(payload: ChannelHistoryChangedPayload): void {
    /* implement me! */
  }
  onChannelJoined(payload: ChannelJoinedPayload): void {
    /* implement me! */
  }
  onChannelLeft(payload: ChannelLeftPayload): void {
    /* implement me! */
  }
  onChannelMarked(payload: ChannelMarkedPayload): void {
    /* implement me! */
  }
  onChannelRename(payload: ChannelRenamePayload): void {
    /* implement me! */
  }
  onChannelUnarchive(payload: ChannelUnarchivePayload): void {
    /* implement me! */
  }
  onCommandsChanged(payload: CommandsChangedPayload): void {
    /* implement me! */
  }
  onDndUpdated(payload: DndUpdatedPayload): void {
    /* implement me! */
  }
  onDndUpdatedUser(payload: DndUpdatedUserPayload): void {
    /* implement me! */
  }
  onEmailDomainChanged(payload: EmailDomainChangedPayload): void {
    /* implement me! */
  }
  onEmojiRemoved(payload: EmojiRemovedPayload): void {
    /* implement me! */
  }
  onEmojiAdded(payload: EmojiAddedPayload): void {
    /* implement me! */
  }
  onFileChange(payload: FileChangePayload): void {
    /* implement me! */
  }
  onFileCommentAdded(payload: FileCommentAddedPayload): void {
    /* implement me! */
  }
  onFileCommentDeleted(payload: FileCommentDeletedPayload): void {
    /* implement me! */
  }
  onFileCommentEdited(payload: FileCommentEditedPayload): void {
    /* implement me! */
  }
  onFileCreated(payload: FileCreatedPayload): void {
    /* implement me! */
  }
  onFileDeleted(payload: FileDeletedPayload): void {
    /* implement me! */
  }
  onFilePublic(payload: FilePublicPayload): void {
    /* implement me! */
  }
  onFileShared(payload: FileSharedPayload): void {
    /* implement me! */
  }
  onFileUnshared(payload: FileUnsharedPayload): void {
    /* implement me! */
  }
  onGoodbye(payload: GoodbyePayload): void {
    /* implement me! */
  }
  onGroupArchive(payload: GroupArchivePayload): void {
    /* implement me! */
  }
  onGroupClose(payload: GroupClosePayload): void {
    /* implement me! */
  }
  onGroupHistoryChanged(payload: GroupHistoryChangedPayload): void {
    /* implement me! */
  }
  onGroupJoined(payload: GroupJoinedPayload): void {
    /* implement me! */
  }
  onGroupLeft(payload: GroupLeftPayload): void {
    /* implement me! */
  }
  onGroupMarked(payload: GroupMarkedPayload): void {
    /* implement me! */
  }
  onGroupOpen(payload: GroupOpenPayload): void {
    /* implement me! */
  }
  onGroupRename(payload: GroupRenamePayload): void {
    /* implement me! */
  }
  onGroupUnarchive(payload: GroupUnarchivePayload): void {
    /* implement me! */
  }
  onImClose(payload: ImClosePayload): void {
    /* implement me! */
  }
  onImCreated(payload: ImCreatedPayload): void {
    /* implement me! */
  }
  onImMarked(payload: ImMarkedPayload): void {
    /* implement me! */
  }
  onImOpen(payload: ImOpenPayload): void {
    /* implement me! */
  }
  onManualPresenceChange(payload: ManualPresenceChangePayload): void {
    /* implement me! */
  }
  onMemberJoinedChannel(payload: MemberJoinedChannelPayload): void {
    /* implement me! */
  }
  onMessage(payload: MessagePayload): void {
    /* implement me! */
  }
}
export class SlackApiDispatcher {
  private readonly __listener: SlackApiListener
  constructor(listener: SlackApiListener) {
    this.__listener = listener
  }
  dispatch(input: any): void {
    if (isHelloPayload(input)) {
      this.__listener.onHello(input)
    } else if (isConnectionErrorPayload(input)) {
      this.__listener.onConnectionError(input)
    } else if (isAccountsChangedPayload(input)) {
      this.__listener.onAccountsChanged(input)
    } else if (isBotAddedPayload(input)) {
      this.__listener.onBotAdded(input)
    } else if (isBotChangedPayload(input)) {
      this.__listener.onBotChanged(input)
    } else if (isChannelArchivePayload(input)) {
      this.__listener.onChannelArchive(input)
    } else if (isChannelCreatedPayload(input)) {
      this.__listener.onChannelCreated(input)
    } else if (isChannelDeletedPayload(input)) {
      this.__listener.onChannelDeleted(input)
    } else if (isChannelHistoryChangedPayload(input)) {
      this.__listener.onChannelHistoryChanged(input)
    } else if (isChannelJoinedPayload(input)) {
      this.__listener.onChannelJoined(input)
    } else if (isChannelLeftPayload(input)) {
      this.__listener.onChannelLeft(input)
    } else if (isChannelMarkedPayload(input)) {
      this.__listener.onChannelMarked(input)
    } else if (isChannelRenamePayload(input)) {
      this.__listener.onChannelRename(input)
    } else if (isChannelUnarchivePayload(input)) {
      this.__listener.onChannelUnarchive(input)
    } else if (isCommandsChangedPayload(input)) {
      this.__listener.onCommandsChanged(input)
    } else if (isDndUpdatedPayload(input)) {
      this.__listener.onDndUpdated(input)
    } else if (isDndUpdatedUserPayload(input)) {
      this.__listener.onDndUpdatedUser(input)
    } else if (isEmailDomainChangedPayload(input)) {
      this.__listener.onEmailDomainChanged(input)
    } else if (isEmojiRemovedPayload(input)) {
      this.__listener.onEmojiRemoved(input)
    } else if (isEmojiAddedPayload(input)) {
      this.__listener.onEmojiAdded(input)
    } else if (isFileChangePayload(input)) {
      this.__listener.onFileChange(input)
    } else if (isFileCommentAddedPayload(input)) {
      this.__listener.onFileCommentAdded(input)
    } else if (isFileCommentDeletedPayload(input)) {
      this.__listener.onFileCommentDeleted(input)
    } else if (isFileCommentEditedPayload(input)) {
      this.__listener.onFileCommentEdited(input)
    } else if (isFileCreatedPayload(input)) {
      this.__listener.onFileCreated(input)
    } else if (isFileDeletedPayload(input)) {
      this.__listener.onFileDeleted(input)
    } else if (isFilePublicPayload(input)) {
      this.__listener.onFilePublic(input)
    } else if (isFileSharedPayload(input)) {
      this.__listener.onFileShared(input)
    } else if (isFileUnsharedPayload(input)) {
      this.__listener.onFileUnshared(input)
    } else if (isGoodbyePayload(input)) {
      this.__listener.onGoodbye(input)
    } else if (isGroupArchivePayload(input)) {
      this.__listener.onGroupArchive(input)
    } else if (isGroupClosePayload(input)) {
      this.__listener.onGroupClose(input)
    } else if (isGroupHistoryChangedPayload(input)) {
      this.__listener.onGroupHistoryChanged(input)
    } else if (isGroupJoinedPayload(input)) {
      this.__listener.onGroupJoined(input)
    } else if (isGroupLeftPayload(input)) {
      this.__listener.onGroupLeft(input)
    } else if (isGroupMarkedPayload(input)) {
      this.__listener.onGroupMarked(input)
    } else if (isGroupOpenPayload(input)) {
      this.__listener.onGroupOpen(input)
    } else if (isGroupRenamePayload(input)) {
      this.__listener.onGroupRename(input)
    } else if (isGroupUnarchivePayload(input)) {
      this.__listener.onGroupUnarchive(input)
    } else if (isImClosePayload(input)) {
      this.__listener.onImClose(input)
    } else if (isImCreatedPayload(input)) {
      this.__listener.onImCreated(input)
    } else if (isImMarkedPayload(input)) {
      this.__listener.onImMarked(input)
    } else if (isImOpenPayload(input)) {
      this.__listener.onImOpen(input)
    } else if (isManualPresenceChangePayload(input)) {
      this.__listener.onManualPresenceChange(input)
    } else if (isMemberJoinedChannelPayload(input)) {
      this.__listener.onMemberJoinedChannel(input)
    } else if (isMessagePayload(input)) {
      this.__listener.onMessage(input)
    }
    throw new TypeError('Unrecognized payload value!')
  }
}
