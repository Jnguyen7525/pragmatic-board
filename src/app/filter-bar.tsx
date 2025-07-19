'use client';

import { SettingsContext } from '@/shared/settings-context';
import { bindAll } from 'bind-event-listener';
import { Code, Menu, PanelTopClose, PanelTopOpen, Settings, User2, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { FPSPanel } from './fps-panel';
import { SettingsDialog } from './settings-dialog';

type TRoute = { title: string; href: string };

const routes = {
  board: { title: 'Board', href: '/board' },
  oneColumn: { title: 'One Column', href: '/one-column' },
  twoColumns: { title: 'Two Columns', href: '/two-columns' },
} as const satisfies { [key: string]: TRoute };

export function FilterBar() {
  const pathname = usePathname();
  const [isFilterBarExpanded, setIsFilterBarExpanded] = useState<boolean>(true);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState<boolean>(false);
  const settingsDialogRef = useRef<HTMLDivElement | null>(null);
  const settingsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    return bindAll(window, [
      {
        type: 'keydown',
        listener(event) {
          if (event.key !== 'Escape') {
            return;
          }

          if (isSettingsDialogOpen) {
            setIsSettingsDialogOpen(false);
            return;
          }
          setIsFilterBarExpanded((current) => !current);
        },
      },
      {
        type: 'click',
        listener(event) {
          if (!(event.target instanceof Element)) {
            return;
          }

          if (!isSettingsDialogOpen) {
            return;
          }

          const dialog = settingsDialogRef.current;
          const trigger = settingsTriggerRef.current;
          if (!dialog || !trigger) {
            return;
          }
          if (trigger.contains(event.target)) {
            return;
          }

          if (dialog.contains(event.target)) {
            return;
          }

          setIsSettingsDialogOpen(false);
        },
      },
    ]);
  }, [isFilterBarExpanded, isSettingsDialogOpen]);

  return (
    <>
      <header
        className={`flex h-14 flex-row items-center justify-between gap-1 border-b border-zinc-900 bg-zinc-950 px-3`}
      >
        <Link
          href={'/'}
          className={`flex-shrink rounded p-2 leading-none text-white sm:text-lg sm:leading-none`}
        >
          <span>board name</span>
        </Link>
        <div className="z-1 flex items-center justify-center gap-1">
          <button
            type="button"
            ref={settingsTriggerRef}
            className="rounded p-2 text-white"
            onClick={() => setIsSettingsDialogOpen((current) => !current)}
            aria-label="toggle top bar visibility"
          >
            <User2 size={24} />
          </button>

          <button
            type="button"
            ref={settingsTriggerRef}
            className="rounded p-2 text-white"
            onClick={() => setIsSettingsDialogOpen((current) => !current)}
            aria-label="toggle top bar visibility"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
    </>
  );
}
