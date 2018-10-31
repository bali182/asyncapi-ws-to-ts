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
export type SlackApiServerListener = {
  outgoingMessage(payload: OutgoingMessagePayload): void
}
export abstract class SlackApiServerListenerStub implements SlackApiServerListener {
  outgoingMessage(payload: OutgoingMessagePayload): void {
    /* implement me! */
  }
}
export class SlackApiServerMessageReceiver {
  private readonly __listener: SlackApiServerListener
  constructor(listener: SlackApiServerListener) {
    this.__listener = listener
  }
  receive(input: any): void {
    if (isOutgoingMessagePayload(input)) {
      this.__listener.outgoingMessage(input)
    }
    throw new TypeError('Unrecognized payload value!')
  }
}
export class SlackApiServerMessageSender {
  private readonly __adapter: __SendMessageAdapter
  constructor(adapter: __SendMessageAdapter) {
    this.__adapter = adapter
  }
  hello(payload: HelloPayload): void {
    if (!isHelloPayload(payload)) {
      throw new TypeError('Parameter payload should be of type HelloPayload!')
    }
    this.__adapter.send(payload)
  }
  connectionError(payload: ConnectionErrorPayload): void {
    if (!isConnectionErrorPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ConnectionErrorPayload!')
    }
    this.__adapter.send(payload)
  }
  accountsChanged(payload: AccountsChangedPayload): void {
    if (!isAccountsChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type AccountsChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  botAdded(payload: BotAddedPayload): void {
    if (!isBotAddedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type BotAddedPayload!')
    }
    this.__adapter.send(payload)
  }
  botChanged(payload: BotChangedPayload): void {
    if (!isBotChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type BotChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelArchive(payload: ChannelArchivePayload): void {
    if (!isChannelArchivePayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelArchivePayload!')
    }
    this.__adapter.send(payload)
  }
  channelCreated(payload: ChannelCreatedPayload): void {
    if (!isChannelCreatedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelCreatedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelDeleted(payload: ChannelDeletedPayload): void {
    if (!isChannelDeletedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelDeletedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelHistoryChanged(payload: ChannelHistoryChangedPayload): void {
    if (!isChannelHistoryChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelHistoryChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelJoined(payload: ChannelJoinedPayload): void {
    if (!isChannelJoinedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelJoinedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelLeft(payload: ChannelLeftPayload): void {
    if (!isChannelLeftPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelLeftPayload!')
    }
    this.__adapter.send(payload)
  }
  channelMarked(payload: ChannelMarkedPayload): void {
    if (!isChannelMarkedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelMarkedPayload!')
    }
    this.__adapter.send(payload)
  }
  channelRename(payload: ChannelRenamePayload): void {
    if (!isChannelRenamePayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelRenamePayload!')
    }
    this.__adapter.send(payload)
  }
  channelUnarchive(payload: ChannelUnarchivePayload): void {
    if (!isChannelUnarchivePayload(payload)) {
      throw new TypeError('Parameter payload should be of type ChannelUnarchivePayload!')
    }
    this.__adapter.send(payload)
  }
  commandsChanged(payload: CommandsChangedPayload): void {
    if (!isCommandsChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type CommandsChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  dndUpdated(payload: DndUpdatedPayload): void {
    if (!isDndUpdatedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type DndUpdatedPayload!')
    }
    this.__adapter.send(payload)
  }
  dndUpdatedUser(payload: DndUpdatedUserPayload): void {
    if (!isDndUpdatedUserPayload(payload)) {
      throw new TypeError('Parameter payload should be of type DndUpdatedUserPayload!')
    }
    this.__adapter.send(payload)
  }
  emailDomainChanged(payload: EmailDomainChangedPayload): void {
    if (!isEmailDomainChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type EmailDomainChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  emojiRemoved(payload: EmojiRemovedPayload): void {
    if (!isEmojiRemovedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type EmojiRemovedPayload!')
    }
    this.__adapter.send(payload)
  }
  emojiAdded(payload: EmojiAddedPayload): void {
    if (!isEmojiAddedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type EmojiAddedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileChange(payload: FileChangePayload): void {
    if (!isFileChangePayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileChangePayload!')
    }
    this.__adapter.send(payload)
  }
  fileCommentAdded(payload: FileCommentAddedPayload): void {
    if (!isFileCommentAddedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileCommentAddedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileCommentDeleted(payload: FileCommentDeletedPayload): void {
    if (!isFileCommentDeletedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileCommentDeletedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileCommentEdited(payload: FileCommentEditedPayload): void {
    if (!isFileCommentEditedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileCommentEditedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileCreated(payload: FileCreatedPayload): void {
    if (!isFileCreatedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileCreatedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileDeleted(payload: FileDeletedPayload): void {
    if (!isFileDeletedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileDeletedPayload!')
    }
    this.__adapter.send(payload)
  }
  filePublic(payload: FilePublicPayload): void {
    if (!isFilePublicPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FilePublicPayload!')
    }
    this.__adapter.send(payload)
  }
  fileShared(payload: FileSharedPayload): void {
    if (!isFileSharedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileSharedPayload!')
    }
    this.__adapter.send(payload)
  }
  fileUnshared(payload: FileUnsharedPayload): void {
    if (!isFileUnsharedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type FileUnsharedPayload!')
    }
    this.__adapter.send(payload)
  }
  goodbye(payload: GoodbyePayload): void {
    if (!isGoodbyePayload(payload)) {
      throw new TypeError('Parameter payload should be of type GoodbyePayload!')
    }
    this.__adapter.send(payload)
  }
  groupArchive(payload: GroupArchivePayload): void {
    if (!isGroupArchivePayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupArchivePayload!')
    }
    this.__adapter.send(payload)
  }
  groupClose(payload: GroupClosePayload): void {
    if (!isGroupClosePayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupClosePayload!')
    }
    this.__adapter.send(payload)
  }
  groupHistoryChanged(payload: GroupHistoryChangedPayload): void {
    if (!isGroupHistoryChangedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupHistoryChangedPayload!')
    }
    this.__adapter.send(payload)
  }
  groupJoined(payload: GroupJoinedPayload): void {
    if (!isGroupJoinedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupJoinedPayload!')
    }
    this.__adapter.send(payload)
  }
  groupLeft(payload: GroupLeftPayload): void {
    if (!isGroupLeftPayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupLeftPayload!')
    }
    this.__adapter.send(payload)
  }
  groupMarked(payload: GroupMarkedPayload): void {
    if (!isGroupMarkedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupMarkedPayload!')
    }
    this.__adapter.send(payload)
  }
  groupOpen(payload: GroupOpenPayload): void {
    if (!isGroupOpenPayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupOpenPayload!')
    }
    this.__adapter.send(payload)
  }
  groupRename(payload: GroupRenamePayload): void {
    if (!isGroupRenamePayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupRenamePayload!')
    }
    this.__adapter.send(payload)
  }
  groupUnarchive(payload: GroupUnarchivePayload): void {
    if (!isGroupUnarchivePayload(payload)) {
      throw new TypeError('Parameter payload should be of type GroupUnarchivePayload!')
    }
    this.__adapter.send(payload)
  }
  imClose(payload: ImClosePayload): void {
    if (!isImClosePayload(payload)) {
      throw new TypeError('Parameter payload should be of type ImClosePayload!')
    }
    this.__adapter.send(payload)
  }
  imCreated(payload: ImCreatedPayload): void {
    if (!isImCreatedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ImCreatedPayload!')
    }
    this.__adapter.send(payload)
  }
  imMarked(payload: ImMarkedPayload): void {
    if (!isImMarkedPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ImMarkedPayload!')
    }
    this.__adapter.send(payload)
  }
  imOpen(payload: ImOpenPayload): void {
    if (!isImOpenPayload(payload)) {
      throw new TypeError('Parameter payload should be of type ImOpenPayload!')
    }
    this.__adapter.send(payload)
  }
  manualPresenceChange(payload: ManualPresenceChangePayload): void {
    if (!isManualPresenceChangePayload(payload)) {
      throw new TypeError('Parameter payload should be of type ManualPresenceChangePayload!')
    }
    this.__adapter.send(payload)
  }
  memberJoinedChannel(payload: MemberJoinedChannelPayload): void {
    if (!isMemberJoinedChannelPayload(payload)) {
      throw new TypeError('Parameter payload should be of type MemberJoinedChannelPayload!')
    }
    this.__adapter.send(payload)
  }
  message(payload: MessagePayload): void {
    if (!isMessagePayload(payload)) {
      throw new TypeError('Parameter payload should be of type MessagePayload!')
    }
    this.__adapter.send(payload)
  }
}
