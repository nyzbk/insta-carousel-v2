
export interface CarouselPage {
  title: string;
  intro_paragraph: string;
  points: string[];
  blockquote_text: string;
}

export interface CallToActionPage {
    title: string;
    description: string;
}

export interface CarouselContent {
  first_page_title: string;
  content_pages: CarouselPage[];
  call_to_action_page: CallToActionPage;
}

export type CarouselDesign = 'notes' | 'journal' | 'minimal_dark' | 'influencer';

export interface UserProfile {
    name: string;
    handle: string;
    avatarUrl: string | null;
}