# Fix: "EMFILE: too many open files" Error on macOS

## Problem

When running `npm run dev`, you may encounter the error:
```
Watchpack Error (watcher): Error: EMFILE: too many open files, watch
```

This error occurs because macOS has a default limit of file descriptors (typically 256-1024), and Next.js development server needs to watch many files in your project.

## Solution

### Quick Fix (Temporary - for current terminal session only)

Run this command before starting the dev server:

```bash
ulimit -n 65536 && npm run dev
```

Or use the provided script:

```bash
./.increase-file-limit.sh
```

### Permanent Fix (Recommended)

#### Step 1: Create a Launch Daemon Configuration

Create a file at `/Library/LaunchDaemons/limit.maxfiles.plist`:

```bash
sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
```

Add this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxfiles</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxfiles</string>
      <string>65536</string>
      <string>200000</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
```

#### Step 2: Set permissions and load the configuration

```bash
sudo chown root:wheel /Library/LaunchDaemons/limit.maxfiles.plist
sudo chmod 644 /Library/LaunchDaemons/limit.maxfiles.plist
sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
```

#### Step 3: Add to your shell profile

Add this line to your `~/.zshrc` (or `~/.bash_profile` if using bash):

```bash
ulimit -n 65536
```

Then reload your shell:

```bash
source ~/.zshrc
```

#### Step 4: Restart your Mac

For the changes to take full effect, restart your Mac.

#### Step 5: Verify

After restart, check your new limits:

```bash
ulimit -n
# Should show: 65536

launchctl limit maxfiles
# Should show something like: maxfiles    65536          200000
```

## Alternative: Reduce Files Being Watched

If you still experience issues, you can try:

1. **Move the `out/` directory** (already done):
   ```bash
   mv out out.backup
   ```

2. **Clear caches**:
   ```bash
   rm -rf .next node_modules/.cache
   ```

3. **Reinstall node_modules**:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Why This Happens

Your project has:
- 692 static pages being generated
- 118+ image files in `public/images`
- Multiple nested directories with many files
- Next.js needs to watch all these files for hot reload

This quickly exceeds macOS's default file descriptor limit.

## References

- [Next.js GitHub Issue](https://github.com/vercel/next.js/issues/27417)
- [macOS File Limits Documentation](https://wilsonmar.github.io/maximum-limits/)
