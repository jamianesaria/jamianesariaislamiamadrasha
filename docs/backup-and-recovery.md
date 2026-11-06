# Encrypted Sanity backups

`npm run backup` exports both configured datasets, including drafts and assets, into importable tar.gz archives encrypted directly with AES-256-GCM. Plaintext applicant data is never written to a file. The default destination is ignored `.cms-work/backups`; incomplete exports retain a `.partial` suffix and must not be treated as backups.

Set `SANITY_API_TOKEN` to an appropriately scoped server credential and `SANITY_BACKUP_PASSPHRASE` to at least 32 characters in the local environment. A strong random passphrase was generated in the ignored `.env.local` during the repair. Keep a recovery copy in the client's password manager, separate from the encrypted archives. Do not paste the passphrase into chat, commit it, or include it with off-site backups.

Verify each archive without changing Sanity:

```powershell
npm run backup
npm run backup:verify -- .cms-work/backups/<timestamp>-production.sanity.enc
npm run backup:verify -- .cms-work/backups/<timestamp>-submissions.sanity.enc
```

Verification authenticates decryption and reads the compressed tar structure, requiring an importable NDJSON data file. It never prints or writes document contents. The initial archives for both datasets passed this check. This is an archive-recovery check, not a full restore rehearsal in a separate live project.

The archive format is `SANITYBK1\n`, a 16-byte scrypt salt, a 12-byte AES-GCM IV, encrypted tar.gz bytes, then the 16-byte authentication tag. Derive a 32-byte key with Node's `scryptSync(passphrase, salt, 32)`. For recovery, have a trusted administrator decrypt in a secure workspace and use the official Sanity dataset importer against a separate recovery project/dataset first. Never import directly over production as an unreviewed recovery step. Sanity asset export can lose some original filename metadata; test restoration of actual images/files.

No off-site destination, recurring backup schedule, credentials, or retention requirement was supplied. Local encrypted snapshots are ready, but local copies alone do not protect against losing this machine. Assign a client-owned secure destination and schedule daily or weekly exports according to application volume; verify a periodic restore and store the encryption key separately. Do not create a third dataset in this project as a backup: both Free-plan dataset slots are already in use.
