import { ContentColumns } from "pdfmake/interfaces";
import { headerSection } from "../sections/header.section"

describe('HeaderSection', () => {

    it('should create a header section with date and logo in true', () => {
        const result = headerSection({
            subtitle: 'This is a subtitle',
            title: 'This is a title',
            showDate: true,
            showLogo: true
        }) as ContentColumns
        expect(result.columns).toBeDefined();
        expect(result.columns[1]).not.toBe(null);
    })

    it('should create a header section with date and logo in false', () => {
        const result = headerSection({
            subtitle: 'This is a subtitle',
            title: 'This is a title',
            showDate: false,
            showLogo: false
        }) as ContentColumns
        expect(result.columns).toBeDefined();
        expect(result.columns[1]).toBe(null);
    })

    it('should create a header section with date and logo null', () => {
        const result = headerSection({
            subtitle: 'This is a subtitle',
            title: 'This is a title'
        }) as ContentColumns
        expect(result.columns).toBeDefined();
        expect(result.columns[1]).not.toBe(null);
    })
})